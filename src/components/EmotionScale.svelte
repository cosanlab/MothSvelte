<script>
  import { currentPageNumber, EmotionScaleModel } from "../lib/pageSteps";
  import { emotions } from "../constants/emotions";

  // Create an array of fillWidths to store the width for each div
  let fillWidths = Array(emotions.length).fill(0);
  // array of emotions names
  // Create an array to keep track of whether a div is clicked or not
  let clickedDivs = Array(emotions.length).fill(false);

  // Function to handle mouse move for a specific div
  function handleMouseMove(index, event) {
    if (!clickedDivs[index]) {
      const mouseX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const divWidth = event.currentTarget.clientWidth;
      fillWidths[index] = Math.floor((mouseX / divWidth) * 100);
      // Set the "None" div background to white on mousemove
      clickedDivs[emotions.length] = true;
    }
  }

  

  // Function to handle mouse out for a specific div with a delay
  function handleMouseOut(index) {
    if (!clickedDivs[index]) {
      fillWidths[index] = 0;
    }
    // Set the "None" div background to white on mousemove
    clickedDivs[emotions.length] = false;
  }

  // Function to handle div click
  function handleDivClick(index) {
    clickedDivs[index] = true;
    // Set the "None" div background to white on mousemove
    clickedDivs[emotions.length] = true;
  }

  // Function to be called when pressing "Space" button
  function nextPage() {
   EmotionScaleModel.set(false);
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

<div class="container w-full h-full flex justify-center items-center">
  <div class="wrapper mt-10 flex justify-center flex-col gap-1">
    <div class="instruction mb-3 text-[19px]">
      Please rate the emotions as instructed by the video:
    </div>
    <!-- Your existing code for emotion_tabs -->
    {#each emotions as emotion, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->

      <div
        class="emotion_tab flex gap-0.5 justify-center items-center w-[450px]"
      >
        <div
          class="none-tab px-1 text-[19px] bg-[#ff816d] border-2 border-black"
          class:bg-white={clickedDivs[index] || fillWidths[index]}
        >
          None
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="box w-[400px] h-[32px] relative cursor-pointer border-2 border-black"
          on:mousemove={(e) => handleMouseMove(index, e)}
          on:mouseout={() => handleMouseOut(index)}
          on:click={() => handleDivClick(index)}
        >
          <div
            class="fill absolute top-0 left-0 w-full h-full bg-[#ff816d]"
            style={`width: ${fillWidths[index]}%; transition: width 0.2s ease;`}
          />
        </div>
        <div class="emotion_name flex justify-start ml-1" />
        <p class="w-[220px] justify-start text-[19px]">{emotion}</p>
      </div>
    {/each}
    <!-- press space button -->
    <p class="mt-3 text-[19px]">Press "space" when finished</p>
  </div>
</div>

<style>
  .emotion_tab {
    min-width: 450px;
  }
</style>