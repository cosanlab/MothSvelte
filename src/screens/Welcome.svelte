<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../store/pageSteps";

  // removing event
  const RemovingEvent = () => {
    window.removeEventListener("keydown", NextPageHandler);
  };

  const NextPageHandler = () => {
    currentPageNumber.set(2);
    // removing event
    RemovingEvent();
  };

  // Add the on:keydown event handler to the window object
  window.addEventListener("keydown", NextPageHandler);
</script>

<!---------- SVELTE + HTML SECTION ---------->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-lg text-gray-700"
  >
    <h1>Welcome to the study.</h1>

    <p class="flex-wrap text-center">
      You may reload this window at any point, or bookmark and return to it, and
      the task will resume approximately where you left off. Feel free to take
      breaks, provided you finish the task within the time window provided.
    </p>

    <p class="flex-wrap text-center">
      If you encounter any issues while completing this task, please try
      reloading the page. If the error persists, contact the requesters (<a
        href="mailto:cosanlab@gmail.com"
        class="text-blue-600 hover:text-blue-800 underline"
        >cosanlab@gmail.com</a
      >), and
      <span class="font-bold">
        rest assured that you will be fully compensated for your time.</span
      >
    </p>

    <p>Thank you in advance for your participation!</p>

    <p>Press any key to begin.</p>
  </div>
</div>

<!-- styling section -->
<style>
  p {
    font-family: "Roboto", sans-serif;
  }
</style>
