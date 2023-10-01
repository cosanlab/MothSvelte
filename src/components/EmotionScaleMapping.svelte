<script>
  import {
    EmotionScaleModel,
    videoTimeStamp,
    selectedRecords,
    showSelectedPoints,
    videoURL,
    lastRating,
  } from "../store/pageSteps";
  import { emotions } from "../constants/emotions";
  import { userID, hitId, videoRefrence } from "../store/index";
  import { db } from "../config/firebase";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { onDestroy, onMount } from "svelte";

  let fillWidths = Array(emotions.length).fill(0);
  let clickedDivs = Array(emotions.length).fill(false);
  let selectedTabs = [];
  let timestamps = "";
  let videoRef = "";
  let screenTimer = 0; // Initialize screenTimer
  let startTime = 0;

  onMount(() => {
    // splitting video url for saving in database
    // Split the URL by '/' and get the last part (the filename)
    const parts = $videoURL.split("/");
    videoRef = parts[parts.length - 1];
    videoRefrence.set(videoRef);

    // setting timestamps for video
    if ($videoTimeStamp > 59) {
      // Calculate minutes and seconds
      const minutes = Math.floor($videoTimeStamp / 60);
      const seconds = Math.floor($videoTimeStamp % 60);

      // Format the time as "mm:ss"
      const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      timestamps = formatted;
    } else {
      // If the timestamp is less than a minute, format it as "0:ss"
      timestamps = `0:${$videoTimeStamp
        .toFixed(0)
        .toString()
        .padStart(2, "0")}`;
    }
  
  // Record the start time when the component is mounted
    startTime = Date.now();
  });

  // onMouseMove function to fill div with mentioned color
  function handleMouseMove(index, event) {
    if (!clickedDivs[index]) {
      const mouseX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const divWidth = event.currentTarget.clientWidth;
      fillWidths[index] = Math.floor((mouseX / divWidth) * 100);
      clickedDivs[emotions.length] = true;
    }
  }

  // handleMouseOut function to remove color which are filled the div.
  function handleMouseOut(index) {
    if (!clickedDivs[index]) {
      fillWidths[index] = 0;
    }
    clickedDivs[emotions.length] = false;
  }

  //handleDivClick function to click on the div and filled the div with the color
  function handleDivClick(index) {
    if (clickedDivs[index]) {
      // Reset click state and fill width
      clickedDivs[index] = false;
      fillWidths[index] = 0;
    } else {
      clickedDivs[index] = true;
    }
    clickedDivs[emotions.length] = true;
  }
  // Remove function should be called immediately when the fired space and complete the actions accordingly
  function RemovingEvent() {
    window.removeEventListener("keydown", spaceKeyPressHandler);
  }

  // storing data function for to  create or store data in the firebase.
  const StoringData = async () => {
    //  getting last and latest array
    let latestArray = $selectedRecords[$selectedRecords.length - 1];

    let mergedArray = emotions.map((emotion, index) => ({
      [emotion]: latestArray[index],
    }));

  // Stop the timer when the component is about to update
    screenTimer = Date.now() - startTime;
    console.log("the screenTimer in milliseconds is : ", screenTimer)
    const timestampDocRef = doc(
      db,
      "study",
      $hitId,
      "users",
      $userID,
      videoRef,
      "ratings",
      "timestamps",
      timestamps
    );

    try {
      await setDoc(timestampDocRef, {
        rating_response_time: screenTimer,
        EmotionScale: mergedArray
         // Add the merged array data
      });
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }

     screenTimer = 0;
  };

  // Inside the nextPage() function:
  const nextPage = async () => {
    selectedTabs = fillWidths.map((width, index) =>
      clickedDivs[index] ? width : 0
    );

    if (selectedTabs.some((width) => width > 0)) {
      $selectedRecords.push(selectedTabs);
      showSelectedPoints.set(true); // Show the selected points and lines
    }

    fillWidths = fillWidths.map(() => 0);
    clickedDivs = clickedDivs.map(() => false);
    // calling a method to store data in databse.
    lastRating.set(false);
    EmotionScaleModel.set(false);
    await StoringData();
    // RemovingEvent();
  };

  // press space button call nextPage function and save data in database.
  const spaceKeyPressHandler = async (event) => {
    if (event.key === " ") {
      await nextPage();
      RemovingEvent();
    }
  };

  window.addEventListener("keydown", spaceKeyPressHandler);
</script>

<!-- ------------- Svelte + html section ---------->
<div class="container w-full h-full flex justify-center items-center">
  <div class="wrapper mt-10 flex justify-center flex-col gap-1">
    <div class="instruction mb-3 text-[19px]">
      Please rate how you're feeling on the following emotions:
    </div>
    <!-- Your existing code for emotion_tabs -->
    {#each emotions as emotion, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->

      <div
        class="emotion_tab flex gap-0.5 justify-center items-center w-[450px]"
      >
        <div
          class="none-tab px-1 text-[19px] bg-[#ff816d] border-2 border-black"
          class:bg-white={clickedDivs[index] || fillWidths[index]}
        >
          None
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="box w-[400px] h-[32px] relative cursor-pointer border-2 border-black"
          on:mousemove={(e) => handleMouseMove(index, e)}
          on:mouseleave={() => handleMouseOut(index)}
          on:click={() => handleDivClick(index)}
        >
          <div
            class="fill absolute top-0 left-0 w-full h-full bg-[#ff816d]"
            style={`width: ${fillWidths[index]}%; transition: width 0.2s ease;`}
          />

          <!-- JS + HTML section -->
          <!-- Display selected points and vertical lines -->
          {#if $showSelectedPoints && $selectedRecords.length > 0}
            {#if $showSelectedPoints && $selectedRecords[$selectedRecords.length - 1][index] > 0}
              <div
                class="selected-point"
                style={`left: ${
                  $selectedRecords[$selectedRecords.length - 1][index]
                }%;`}
              />
            {/if}
          {/if}
        </div>
        <div class="emotion_name flex justify-start ml-1" />
        <p class="w-[220px] justify-start text-[19px]">{emotion}</p>
      </div>
    {/each}

    <!-- press space button -->
    <p class="mt-3 text-[19px]">Press "space" when finished</p>
  </div>
</div>

<style>
  .emotion_tab {
    min-width: 450px;
  }
  .selected-point {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: black;
    opacity: 0.8;
  }
</style>
