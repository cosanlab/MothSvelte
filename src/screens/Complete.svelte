<script>
  import { currentPageNumber } from "../store/index";

  // Function to be called when pressing "Space" button
  function nextPage() {
    currentPageNumber.set(9);
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
      Thank you for participating! Please wait a moment and press 'space' to
      submit the task. If you encounter any errors during submission, do not
      worry, contact <a
        href="mailto:cosanlab@gmail.com"
        class="text-blue-800 underline">cosanlab@gmail.com</a
      > and you will be fully compensated for completing this task.
    </p>
  </div>
</div>
