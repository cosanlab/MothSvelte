<script>
  import "@fontsource/roboto";
  import { verificationData } from "../constants/verificationMedia";
  import { sessionData, currentPageNumber } from "../store/index";
  import RapidRate from "./RapidRate.svelte";

  let videoUrl = ""; // for verification movie
  let selectedObjectName = ""; // New variable to store the object name
  let trial_Times = 0; // mistakes counter
  let maxAttempts = 3; // max number of allowed mistakes
  let currentScreen = 1; //variable to manage screen within component
  let ratingsMap;

  
  function consoleIfDev(...items) {
    if (import.meta.env.DEV){
      console.log(...items);
    }
  }
  
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
    consoleIfDev(selectedObjectName);
  }

  selectRandomMedia();

  function checkRating(ratingsMap, expected) {
    return (
      ratingsMap[expected] > 40 &&
      Object.keys(ratingsMap).every(
        (key) => key === expected || ratingsMap[key] === 0
      )
    );
  }

  function handleRatingsChanged(event) {
    ratingsMap = event.detail.ratings;
    consoleIfDev(ratingsMap);
    consoleIfDev(checkRating(ratingsMap,selectedObjectName))
    if (checkRating(ratingsMap, selectedObjectName)) {
      currentScreen = 5;
    }
    else {
      trial_Times += 1;
      consoleIfDev("This was mistake:", trial_Times);
      if (trial_Times < maxAttempts){
        currentScreen = 4;
      } else {
        ErrorPageHandler();
      }
    }
  }

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
  <RapidRate
    ratingsMap={$sessionData.shuffledEmotions}
    instructions="Please rate the emotions as insructed in the video"
    on:ratingsChanged={handleRatingsChanged}
  />
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
        Great! It seems that you're audio and video are working properly. You
        are now ready to start the main task!
      </p>

      <button
        on:click={NextPageHandler}
        class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
        >Continue</button
      >
    </div>
  </div>
{/if}
