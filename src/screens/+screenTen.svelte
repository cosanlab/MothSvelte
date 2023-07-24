<!-- VideoDisplay.svelte -->
<script>
  import { currentPageNumber } from "../lib/pageSteps";
  import { onMount, onDestroy } from "svelte";

  let videoUrl = "https://d1q27hl3unfcop.cloudfront.net/CopsDontCry.mp4";
  let videoDuration = 0;
  let videoCurrentTime = 0;

  // Function to handle the visibility change event
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause the video when the page becomes hidden
      const video = document.querySelector("video");
      if (video) {
        window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      }
    }
  }
  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Function to handle the loadedmetadata event of the video element
  function handleMetadataLoaded() {
    const video = document.querySelector("video");
    if (video) {
      videoDuration = video.duration; // Get the video duration in seconds
    }
  }

  // Function to update videoCurrentTime when the video is playing
  function updateTime() {
    const video = document.querySelector("video");
    if (video) {
      videoCurrentTime = video.currentTime; // Get the current time of the video in seconds
      // Check if the video has reached its end
      if (videoCurrentTime === videoDuration) {
        currentPageNumber.set(10);
      }
      if (videoCurrentTime >= 19.5 && videoCurrentTime <= 20) {
        currentPageNumber.set(10);
      }
    }
  }

  onMount(() => {
    handleMetadataLoaded();
    const video = document.querySelector("video");
    if (video) {
      video.addEventListener("timeupdate", updateTime); // Add event listener for time updates
    }
  });

  onDestroy(() => {
    const video = document.querySelector("video");
    if (video) {
      video.removeEventListener("timeupdate", updateTime); // Remove event listener on component unmount
    }
  });
</script>

<div
  class="container w-full h-screen flex flex-col gap-4 justify-center items-center"
>
  <div class="wrapper w-[40rem] h-[25rem] bg-black border border-gray-700">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      autoplay
      class="w-full h-full"
      on:loadedmetadata={handleMetadataLoaded}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  </div>
</div>
