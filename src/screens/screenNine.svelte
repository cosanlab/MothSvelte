<script>
  import { currentPageNumber } from "../store/pageSteps";
  import {ScreenNine} from "../constants/constants"
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
      {ScreenNine.NEXT_STEP_INSTRUCTION}
    </p>

    <p class="text-center">
      {ScreenNine.EMOTION_SCALE_INSTRUCTION}
    </p>

    <p>{ScreenNine.PRESS_SPACE}</p>
  </div>
</div>
