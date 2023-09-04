<script>
  import { onMount } from "svelte";
  import "@fontsource/roboto";
  import { currentPageNumber } from "../lib/pageSteps";
  import { verificationData } from "../constants/verificationMedia";
  import { verifyEmotionName } from "../lib/index";
  let videoUrl = "";
  let selectedObjectName = ""; // New variable to store the object name
  

  // Function to select a random object from the array
  function selectRandomMedia() {
    const randomIndex = Math.floor(Math.random() * verificationData.length);
    videoUrl = verificationData[randomIndex].media;
    selectedObjectName = verificationData[randomIndex].name; // Save the object name
    verifyEmotionName.set(selectedObjectName);
    console.log(selectedObjectName);
  }

  function verificationPage() {
    currentPageNumber.set(6);
  }

  // Function to handle the visibility change event
  function handleVisibilityChange() {
    if (document.hidden) {
      const video = document.querySelector("video");
      if (video) {
        video.pause();
         window.alert(
          "To complete this trial, all videos must remain visible and audible."
        );
      }
    }
  }

  // Function to handle video playback ended event
  function handleVideoEnded() {
    verificationPage();
  }

  // Add event listener for visibility change
  // document.addEventListener("visibilitychange", handleVisibilityChange);

  // Call the selectRandomMedia function when the component mounts
  onMount(() => {
    selectRandomMedia();
  });
</script>

<div class="container w-screen h-screen flex justify-center items-center">
  <div class="wrapper md:w-[80%] h-[80%]">
    <!-- svelte-ignore missing-declaration -->
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay class="w-full h-full" on:ended={handleVideoEnded}>
      <source src={videoUrl} type="video/mp4" />
    </video>
  </div>
</div>
