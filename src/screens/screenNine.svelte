<script>
  import { currentPageNumber } from "../lib/pageSteps";

  // removing event
  const RemovingEvent = () => {
    window.removeEventListener("keydown", NextPageHandler);
  };

  const NextPageHandler = () => {
    currentPageNumber.set(9);
    // removing event
    RemovingEvent();
  };

  // Add the on:keydown event handler to the window object
  window.addEventListener("keydown", NextPageHandler);
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper text-lg mx-4 flex flex-wrap flex-col gap-3 justify-center items-center text-gray-700"
  >
    <p class="text-center">
      You are going to watch a video clip. The clip will pause at random times
      and you will be presented with a group of ratings to make.
    </p>

    <p class="text-center">
      Please rate your emotions at the time of the rating, and press the
      spacebar when you are finished to continue watching.
    </p>

    <p>Press any key to begin the task.</p>
  </div>
</div>
