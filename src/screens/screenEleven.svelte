<script>
  import { currentPageNumber } from "../lib/pageSteps";
  // temporary variables
  let storySummary = "";
  let dominantEmotion = "";
  // Triggered next page if everything is working correctly
  const NextPageHandler = () => {
    currentPageNumber.set(11);
  };

  // Handle the click event
  const clickHandler = () => {
    const trimmedStorySummary = storySummary.trim();
    const trimmedDominantEmotion = dominantEmotion.trim();
    if (!trimmedStorySummary  || !trimmedDominantEmotion) {
      window.alert("Please fill the fields for better experience");
    } else {
      NextPageHandler();
    }
  };
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-7 justify-center items-center text-lg text-gray-700"
  >
    <p>
      Thank you for completing the rating task. We have a few more questions.
    </p>
    <!-- centered div -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">
        Please briefly summarize the story you just heard in a couple of
        sentence:
      </h2>
      <!-- textarea -->
      <textarea
        name="story"
        bind:value={storySummary}
        id="story"
        cols="50"
        rows="3"
        class="border border-black text-sm px-1"
      />
    </div>

    <!-- last div or container -->
    <div class="last flex flex-col justify-center items-center gap-4">
      <h2 class="font-bold">
        What was the dominant emotion you experienced while listening to the
        story:
      </h2>
      <!-- input filed -->
      <input
        type="text"
        bind:value={dominantEmotion}
        class="w-[15rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Continue button -->
    <button
      on:click={clickHandler}
      class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
      >Continue
    </button>
  </div>
</div>
