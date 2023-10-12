<script>
  import { onMount } from "svelte";
  import "@fontsource/roboto";
  import { currentPageNumber } from "../store/pageSteps";
  import { verificationData } from "../constants/verificationMedia";
  import { emotionsListShuffled } from "../store/index";

  let videoUrl = ""; // for verification movie
  let selectedObjectName = ""; // New variable to store the object name
  let trial_Times = 0; // mistakes counter
  let maxAttempts = 3; // max number of allowed mistakes
  let currentScreen = 1; //variable to manage screen within component

  console.log($emotionsListShuffled);
  //---- function method to triggered next page for passing and failing check
  const NextPageHandler = () => {
    currentPageNumber.set(4);
  };

  const ErrorPageHandler = () => {
    currentPageNumber.set(20);
  };

  // Function to select a random object from the array
  function selectRandomMedia() {
    const randomIndex = Math.floor(Math.random() * verificationData.length);
    videoUrl = verificationData[randomIndex].media;
    selectedObjectName = verificationData[randomIndex].name; // Save the object name
    console.log(selectedObjectName);
  }

  // Create an array of fillWidths to store the width for each div
  let fillWidths = Array(emotions.length).fill(0);
  // Create an array to keep track of whether a div is clicked or not
  let clickedDivs = Array(emotions.length).fill(false);
  // Create an array to store selected emotions
  let selectedEmotions = [];
  let showErrorPage = false;

  // Function to handle mouse movement for a specific div
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
    if (clickedDivs[index]) {
      clickedDivs[index] = false; // Reset click state
      fillWidths[index] = 0; // Reset fill width
      // Remove the emotion from selectedEmotions array
      selectedEmotions = selectedEmotions.filter(
        (emotion) => emotion !== emotions[index]
      );
    } else {
      clickedDivs[index] = true;
      // Add the emotion to selectedEmotions array
      selectedEmotions = [...selectedEmotions, emotions[index]];
    }
    clickedDivs[emotions.length] = true;
  }

  // Function to be called when pressing "Space" button
  function nextPage() {
    const isCorrect = selectedEmotions.includes(selectedObjectName)
    console.log(isCorrect);
   
    // Based on the result, proceed to the next page or handle accordingly
    if (isCorrect) {
      currentPageNumber.set(7);
      RemovingEvent();
    } else {
      // Handle incorrect selection
      showErrorPage = true;
    }
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

  // Call the selectRandomMedia function when the component mounts
  onMount(() => {
    selectRandomMedia();
  });
</script>

{#if currentScreen === 1}
  <!-- CONTENT SECTION -->
  <div
    class="container w-full h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
    >
      <p class="flex-wrap text-center">
        In the main task, you will be presented with short video clips that tell
        a story. Before we begin, let's make sure that your audio is on and that
        you can follow simple instructions.
      </p>

      <p class="flex-wrap text-center">
        We will now show you a short clip consisting of a black screen with
        audio. Follow the instructions provided in the clip to start the task.
      </p>

      <button
        on:click={() => {
          currentScreen = 2;
        }}
        class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
        >Continue</button
      >
    </div>
  </div>
{/if}

{#if currentScreen === 2}
  <div class="container w-screen h-screen flex justify-center items-center">
    <div class="wrapper md:w-[80%] h-[80%]">
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        autoplay
        class="w-full h-full"
        on:ended={() => {
          currentScreen = 3;
        }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  </div>
{/if}

{#if currentScreen === 3}
<div class="container w-full h-full flex justify-center items-center">
  <div class="wrapper mt-10 flex justify-center flex-col gap-1">
    <div class="instruction mb-3 text-[19px]">
      Please rate the emotions as instructed by the video:
    </div>
    <!-- Your existing code for emotion_tabs -->
    {#each $emotionsListShuffled as emotion, index}
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
          on:mouseleave={() => handleMouseOut(index)}
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

{/if}

{#if currentScreen === 4}
  <div
    class="container w-full h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
    >
      <p class="flex-wrap text-center">
        Sorry, that was not the correct answer. Please try again.
      </p>

      <button
        on:click={() => {
          currentScreen = 1;
        }}
        class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
        >Continue
      </button>
    </div>
  </div>
{/if}

{#if currentScreen === 5}
  <div
    class="container w-full h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
    >
      <p class="flex-wrap text-center">
      Great! It seems that you're audio and video are working properly. You are now ready to start the main task!
      </p>

      <button
        on:click={NextPageHandler}
        class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
        >Continue</button
      >
    </div>
  </div>
{/if}
