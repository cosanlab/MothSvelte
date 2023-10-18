<script>
  import { currentPageNumber, sessionData, curSession } from "../store/index";
  import { saveSessionToDB } from "../constants/utils";
  import RapidRate from "./RapidRate.svelte";
  import { onMount, onDestroy } from "svelte";

  let videoElement;
  const videoURL = $sessionData.stimData.URL;
  const rewind = $sessionData.videoParams.rewind;
  //const videoURL = "https://d1q27hl3unfcop.cloudfront.net/Amused.mp4";
  //const rewind = 2;
  //const breakpoints = [4, 9, 13];

  const attempt = $sessionData.attemptsStartTimestamps.length + 1;
  const breakpoints = $sessionData.breakpoints;
  let currentSegment = $sessionData.completedSegments;
  let segStartTime = 0;
  let currentTime;

  let ratingScreen = false;

  let curRatings = {};
  if (currentSegment === 0) {
    $sessionData.shuffledEmotions.forEach((emotion) => {
    curRatings[emotion] = 0;
    });
  } else {
    curRatings = $sessionData.ratings[currentSegment-1].emotionRatings;
  }

  let timeUpdateListener;

  console.log("Starting main task");
  console.log("Attempt:", attempt);
  console.log("Breakpoints:", breakpoints);
  console.log("rewind param:", rewind);
  console.log("Statrting from segment", currentSegment);

  $sessionData.status = "running";
  sessionData.update((data) => {
    // Copy the existing data and add the new timestamp
    return {
      ...data,
      attemptsStartTimestamps: [...data.attemptsStartTimestamps, Date.now()],
    };
  });
  saveSessionToDB($curSession, $sessionData);

  const NextPageHandler = () => {
    currentPageNumber.set(6);
  };

  function handleVisibilityChange() {
    const video = document.querySelector("video");

    if (document.hidden) {
      // Pause the video when the page becomes hidden
      if (video && !video.paused) {
        window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
      }
    } else {
      // Page is visible again, resume video if it was playing before
      if (video && video.paused) {
        video.play();
      }
    }
  }
  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);
  
/*
  onMount(() => {
    console.log("mounting")
    loadVideoSegment();
  });
 */

  onDestroy(() => {
    // Clean up the video element when the component is destroyed
    if (videoElement) {
      videoElement.removeEventListener("timeupdate", timeUpdateListener);
    }
  });
 
  // Function to handle the loadedmetadata event of the video element
  function loadVideoSegment() {
    if (videoElement) {
      // Figure out the starting time for current segment
      if (currentSegment > 0) {
        segStartTime = Math.max(0, breakpoints[currentSegment - 1] - rewind);
      }
      console.log(
        "current segment:",
        currentSegment,
        "start time:",
        segStartTime
      );
      videoElement.currentTime = segStartTime; // Set the initial video time
      timeUpdateListener = updateTime;
      // Add event listener for time updates
      videoElement.addEventListener("timeupdate", timeUpdateListener);
    }
  }

  function updateTime() {
    if (videoElement) {
      currentTime = videoElement.currentTime;
      if (videoElement.ended) {
        console.log("video ended, starting last rating");
        ratingScreen = true;
      }
      if (
        currentSegment < breakpoints.length &&
        currentTime >= breakpoints[currentSegment]
      ) {
        // Enter the rating component or take any necessary action
        console.log("Break:", currentTime, Date.now());
        ratingScreen = true;
      }
    }
  }

  function handleRatingsChanged(event) {
    curRatings = event.detail.ratings;
    const responseTime = event.detail.responseTime;
    const startTime = event.detail.startTime;
    console.log(
      "ratings for breakpoint:",
      currentSegment,
      responseTime,
      curRatings
    );

    // Update the sessionData with the new ratings
    sessionData.update((currentSessionData) => {
      // Create a new ratings object
      const newRating = {
        rateStartTime: startTime,
        responseTime: responseTime,
        segStart: segStartTime,
        segEnd: currentTime,
        //segEnd: breakpoints[currentSegment],
        attempt: attempt,
        emotionRatings: curRatings,
      };
      // Update the ratings array with the new rating
      const updatedRatings = [...currentSessionData.ratings, newRating];
      // Create a new sessionData object with the updated ratings array
      const updatedSessionData = {
        ...currentSessionData,
        ratings: updatedRatings,
      };
      return updatedSessionData; // This will be the new value of sessionData
    });
    $sessionData.completedSegments = currentSegment+1;
    console.log($sessionData);
    

    // Load the next video segment (if any) and perform other logic as needed
    if (currentSegment < breakpoints.length) {
      saveSessionToDB($curSession, $sessionData);
      currentSegment += 1;
      ratingScreen = false;
    } else {
      (async () => {
        $sessionData.status = "postTaskQuestionnaire";
        await saveSessionToDB($curSession, $sessionData);
        NextPageHandler();
      })();
    }
  }
</script>

{#if ratingScreen}
  <RapidRate
    ratingsMap={curRatings}
    instructions="Please rate how you're feeling on the following emotions:"
    on:ratingsChanged={handleRatingsChanged}
  />
{:else}
  <div
    class="container w-full h-screen flex flex-col gap-4 justify-center items-center"
  >
    <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        autoplay
        class="w-full h-full"
        on:loadedmetadata={loadVideoSegment}
        bind:this={videoElement}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
    </div>
  </div>
{/if}
