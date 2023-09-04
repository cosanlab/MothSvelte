<!-- VideoDisplay.svelte -->
<script>
  import {
    currentPageNumber,
    EmotionScaleModel,
    videoCurrentTime,
    videoTimeStamp
  } from "../lib/pageSteps";
  import { onMount, onDestroy } from "svelte";
  import EmotionScaleMapping from "../components/EmotionScaleMapping.svelte";
  import {MediaFiles} from "../constants/Media";
  console.log(MediaFiles)

  let videoUrl = "";
  let videoDuration = 0;
  let videoElement; // Reference to the video element
  let timeUpdateListener;
  let iteration = 0;
   let isVideoPlaying = true;
  let VideotimeStamps = [];
  
  // Function to select a random object from the array
  function selectRandomMedia() {
    const randomIndex = Math.floor(Math.random() * MediaFiles.length);
    videoUrl = MediaFiles[randomIndex].media;
    console.log(videoUrl)
    VideotimeStamps = MediaFiles[randomIndex].timeStamps; // 
    console.log(VideotimeStamps);
  }

 function handleVisibilityChange() {
    if (document.hidden) {
      const video = document.querySelector("video");
      // Pause the video when the page becomes hidden
      if (video) {
        window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
      }
    } else {
      // Page is visible again, resume video if it was playing before
      const video = document.querySelector("video");
      if (video ) {
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
        currentPageNumber.set(10);
      }

      // loop the videoTimeStamp to find the exact TimeStamp
      for(let i = 0; i < VideotimeStamps.length; i++){
      if ( 
        (videoElement.currentTime >= VideotimeStamps[i].start &&
          videoElement.currentTime <= VideotimeStamps[i].end &&
          iteration == i) 
      ) {
        videoTimeStamp.set(videoElement.currentTime);
        EmotionScaleModel.set(true);
        iteration += 1;
        break; // Exit the loop after finding the matching timestamp
      }
      }

    }
  }

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
