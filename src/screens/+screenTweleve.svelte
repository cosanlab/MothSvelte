<script>
  import { currentPageNumber } from "../lib/pageSteps";
  // Triggered next page if everything is working correctly
  const NextPageHandler = () => {
    currentPageNumber.set(12);
  };

  // Handle the click event
  const clickHandler = () => {
    NextPageHandler();
  };
</script>

<!-- CONTENT SECTION -->
<div class="container w-full h-full flex justify-center items-center">
  <div
    class="wrapper flex flex-col gap-7 justify-center items-center text-gray-700"
  >
    <div class="firstPart mt-2 flex flex-col justify-center items-start gap-1">
      <p>
        Thank you for finishing this video. Before you go, please answer the
        following question.
      </p>
      <p class="italic font-semibold">
        Note: if you have completed this task before, you are not required to
        answer these questions again.
      </p>
    </div>
    <!-- gender selection -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">Your Gender:</h2>
      <input
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Age selection -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">Your Age:</h2>
      <input
        type="number"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Your Ethnicity -->
    <div class="center-div flex flex-col justify-center items-center gap-1">
      <h2 class="flex-wrap text-center font-bold">Your Ethnicity:</h2>

      <p class="flex-wrap text-center">
        (Please copy and paste one item into the following text box)
      </p>
      <!-- list -->
      <ul class="list-disc my-3">
        <li>Hispanic</li>
        <li>Not Hispanic</li>
        <li>Other</li>
      </ul>
      <!-- input tag to enter one of the list task -->
      <input
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Your RACE -->
    <div class="center-div flex flex-col justify-center items-center gap-1">
      <h2 class="flex-wrap text-center font-bold">Your Race:</h2>
      <p class="flex-wrap text-center">
        (Please copy and paste one item into the following text box)
      </p>
      <!-- list -->
      <ul class="list-disc my-4 text-center">
        <li>American Indian / Alaksan Native</li>
        <li>Asian / Aslan American</li>
        <li>Black / African American</li>
        <li>Native Hawalian / Other Pacific Islander</li>
        <li>White</li>
        <li>Multi</li>
        <li>Other</li>
      </ul>
      <!-- input tag to enter one of the list task -->
      <input
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Feedback section -->

    <div
      class="feedback-section flex flex-col justify-center items-center gap-3"
    >
      <p>Feedback on this Task:</p>
      <!-- feedback text area -->
      <textarea
        name="feedback"
        id="feedback"
        cols="40"
        rows="4"
        class="border border-black"
      />
    </div>
    <!-- Continue button -->
    <button
      on:click={clickHandler}
      class="py-1 mb-3 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
      >Continue
    </button>
  </div>
</div>
