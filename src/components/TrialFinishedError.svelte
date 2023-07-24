<script>
  import TrialEndMessage from "./TrialEndMessage.svelte";

  let showLastMsg = false;
   // removing event
  const RemovingEvent = () => {
    window.removeEventListener("keydown", NextPageHandler);
  };

  const NextPageHandler = () => {
    showLastMsg = true;
    // removing event
    RemovingEvent();
  };

  // Add the on:keydown event handler to the window object
  window.addEventListener("keydown", NextPageHandler);
</script>

{#if showLastMsg}
 <TrialEndMessage/>
{:else}
 <div class="container w-full h-screen flex justify-center items-center overflow-hidden">
  <div class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700">
    
    <p class="flex-wrap text-center">Sorry, too many incorrect answers were entered. This trial will not continue.</p>
    <p>Please return HIT.</p>
    
  </div>
 </div>
{/if}
<!-- styling section -->
<style>
  p{
    font-family: "Roboto", sans-serif;
  }
 
</style>