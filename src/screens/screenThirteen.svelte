<script>
  import { currentPageNumber } from "../lib/pageSteps";
  import {ScreenThirteen} from "../constants/constants"
  // Function to be called when pressing "Space" button
  function nextPage() {
    currentPageNumber.set(13);
    RemovingEvent();
  }

  // Event listener function for "Space" key press
  function spaceKeyPressHandler(event) {
    if (event.key === " ") {
      nextPage();
    }
  }

  // Adding the event listener
  window.addEventListener("keydown", spaceKeyPressHandler);

  // Removing event listener
  function RemovingEvent() {
    window.removeEventListener("keydown", spaceKeyPressHandler);
  }
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col justify-center items-center text-lg text-gray-700"
  >
    <p class="text-center">
      {ScreenThirteen.THANKS_MESSAGE}, contact <a
        href="mailto:cosanlab@gmail.com"
        class="text-blue-800 underline">cosanlab@gmail.com</a
      > and you will be fully compensated for completing this HIT.
    </p>
  </div>
</div>
