
<script>
  import { onMount } from 'svelte';
    import "@fontsource/roboto";
import { currentPageNumber } from "../lib/pageSteps";

  function verificationPage() {
    // Your logic for the verificationPage function goes here
    currentPageNumber.set(6);
    // window.alert('verificationPage function called after 3 seconds.');
  }
    // Function to handle the visibility change event
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause the video when the page becomes hidden
      const video = document.querySelector("video");
      if (video) {
        video.pause();
        alert("For a better experience, please stay on this page.");
      }
    }
  }

  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange);

  onMount(() => {
    setTimeout(() => {
      verificationPage();
    }, 3000); // 3000 milliseconds = 3 seconds
  });
</script>

<div class="container w-screen h-screen flex justify-center items-center">
  <div class="wrapper md:w-[80%] h-[80%] bg-black border border-gray-700">
    <!-- Your content goes here -->
  </div>
</div>
