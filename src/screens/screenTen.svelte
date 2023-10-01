<!-- VideoDisplay.svelte -->
<script>
  import {
    currentPageNumber,
    EmotionScaleModel,
    videoCurrentTime,
    videoTimeStamp,
    videoURL,
    lastRating,
  } from "../store/pageSteps";
  import { FilteredVideos, rewind_video, hitId, userID } from "../store/index";

  import { onMount, onDestroy } from "svelte";
  import EmotionScaleMapping from "../components/EmotionScaleMapping.svelte";
  import { Spacing, EndSpace, StartSpace, SampleRate } from "../store/index";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../config/firebase";

  let videoUrl = "";
  let videoDuration = 0;
  let videoElement; // Reference to the video element
  let timeUpdateListener;
  let iteration = 0;
  let videoRef = "";
  // -------------- stim - paramaters ---------------
  let sampleRate = $SampleRate;
  let spacing = $Spacing;
  let startSpace = $StartSpace;
  let endSpace = $EndSpace;
  let stimLength = 0;
  let breaks = [];

  // ----------- saving all breakpoints into firebase store -------
  const StoringBreakPoints = async (breakpoints) => {
    
 const formattedBreakPoints = breakpoints.map((seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
 });
 console.log("formatted breakpoints: ", formattedBreakPoints)

    const timestampDocRef = doc(
      db,
      "study",
      $hitId,
      "users",
      $userID,
      videoRef,
      "breakpoints"
    );

    try {
      await setDoc(timestampDocRef, {
        breaks: formattedBreakPoints,
      });
      console.log("breakpoints stored successfully");
    } catch (error) {
      console.error("Error storing breakpoints:", error);
    }
  };
 
  // Function to select a random object from the array
  function selectRandomMedia() {
    const randomIndex = Math.floor(Math.random() * $FilteredVideos.length);
    videoUrl = $FilteredVideos[randomIndex];
    const parts = videoUrl.split(".");
    const extractedPart = parts.slice(1).join(".");
    videoURL.set(extractedPart);

    const videoName = extractedPart.split("/");
    videoRef = videoName[videoName.length - 1];
    console.log("videoRef in screenTen is: ", videoRef);
  }

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

  // Function to handle the loadedmetadata event of the video element
  function handleMetadataLoaded() {
    if (videoElement) {
      videoDuration = videoElement.duration; // Get the video duration in seconds
      stimLength = videoDuration.toFixed(0);

      if (stimLength > 0) {
        calculateBreaks();
      }
      console.log(stimLength);
      videoElement.currentTime = $videoCurrentTime; // Set the initial video time
      timeUpdateListener = updateTime;
      videoElement.addEventListener("timeupdate", timeUpdateListener); // Add event listener for time updates
    }
  }

  // Function to update videoCurrentTime when the video is playing
  function updateTime() {
    if (videoElement) {
      $videoCurrentTime = videoElement.currentTime; // Update the videoCurrentTime store
      // Check if the video has reached its end
      if (videoElement.ended) {
        videoTimeStamp.set(videoElement.currentTime);
        lastRating.set(true);
        currentPageNumber.set(10);
      }

      // temporary one
      // if (iteration == 2) {
      //   currentPageNumber.set(10);
      // }

      // loop the videoTimeStamp to find the exact TimeStamp
      for (let i = 0; i < breaks.length; i++) {
        if (
          videoElement.currentTime >= breaks[i] &&
          videoElement.currentTime <= breaks[i] + 0.3 &&
          iteration == i
        ) {
          videoTimeStamp.set(videoElement.currentTime);
          EmotionScaleModel.set(true);
          iteration += 1;
          $videoCurrentTime = videoElement.currentTime - $rewind_video;
          break; // Exit the loop after finding the matching timestamp
        }
      }
    }
  }

  //--------------- Stim - Paramaters ---------------
  // Function to calculate breaks
  function calculateBreaks() {
    let numBreaks = Math.ceil(stimLength / sampleRate);
    let availableTimesRange = {
      start: startSpace,
      end: stimLength - endSpace,
    };

    while (breaks.length < numBreaks) {
      let randomTime = getRandomTime(availableTimesRange);
      let minSpace = getMinSpace(breaks, randomTime);

      // Check if the minimum space between breaks is greater than or equal to spacing
      if (minSpace >= spacing) {
        breaks.push(Math.ceil(randomTime));
        breaks.sort((a, b) => a - b); // Sort the breaks in ascending order
      }
    }

    console.log(breaks);
    // saving all breaks points into firebase store
    StoringBreakPoints(breaks);
  }

  // Function to calculate the minimum space between the new break and existing breaks
  function getMinSpace(existingBreaks, newBreak) {
    let minSpace = Infinity;
    for (let i = 0; i < existingBreaks.length; i++) {
      let space = Math.abs(existingBreaks[i] - newBreak);
      if (space < minSpace) {
        minSpace = space;
      }
    }
    return minSpace;
  }

  // Function to generate a random time within the available times range
  function getRandomTime(range) {
    return range.start + Math.random() * (range.end - range.start);
  }

  //------------- onMount ----------------
  onMount(() => {
    selectRandomMedia();
    handleMetadataLoaded();
  });

  onDestroy(() => {
    if (videoElement) {
      videoElement.removeEventListener("timeupdate", timeUpdateListener); // Remove event listener on component unmount
    }
  });
</script>

{#if $EmotionScaleModel}
  <EmotionScaleMapping />
{:else}
  <div
    class="container w-full h-screen flex flex-col gap-4 justify-center items-center"
  >
    <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        autoplay
        class="w-full h-full"
        on:loadedmetadata={handleMetadataLoaded}
        bind:this={videoElement}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  </div>
{/if}
