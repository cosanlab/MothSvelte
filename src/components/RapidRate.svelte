<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let ratingsMap; // Map of ratings as a prop
  export let instructions = "Please rate how you're feeling on the followings:";

  import { onMount } from "svelte";

  function initializeRatings(ratingsMap) {
    if (Array.isArray(ratingsMap)) {
      // If ratingsMap is an array, initialize each item to 0
      const ratings = {};
      for (const word of ratingsMap) {
        ratings[word] = 0;
      }
      return ratings;
    } else if (typeof ratingsMap === "object") {
      // If ratingsMap is an object (map), initialize missing ratings to 0
      const ratings = {};
      for (const word of Object.keys(ratingsMap)) {
        ratings[word] = ratingsMap[word] || 0;
      }
      return ratings;
    } else {
      // Handle other cases or return a default value
      return {};
    }
  }

  let ratings = initializeRatings(ratingsMap);
  let scales = Object.keys(ratings);

  // Create an array of fillWidths to store the width for each div
  let fillWidths = Array(scales.length).fill(0);
  // Create an array to keep track of whether a div is clicked or not
  let clickedDivs = Array(scales.length).fill(false);
  let startTime = 0;


  // onMouseMove function to fill div with mentioned color
  function handleMouseMove(index, event) {
    if (!clickedDivs[index]) {
      const mouseX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const divWidth = event.currentTarget.clientWidth;
      fillWidths[index] = Math.floor((mouseX / divWidth) * 100);
      // Set the "None" div background to white on mousemove
      // clickedDivs[scales.length] = true;
    }
  }

  // Function to handle mouse out for a specific div with a delay
  function handleMouseOut(index) {
    if (!clickedDivs[index]) {
      fillWidths[index] = 0;
    }
    // Set the "None" div background to white on mousemove
    //clickedDivs[scales.length] = false;
  }

  // Function to handle div click
  function handleDivClick(index) {
    if (clickedDivs[index]) {
      clickedDivs[index] = false; // Reset click state
      fillWidths[index] = 0; // Reset fill width
    } else {
      clickedDivs[index] = true;
    }
    //clickedDivs[scales.length] = true;
  }

  function updateRatingsFromFillWidths() {
    fillWidths.forEach((width, index) => {
      ratings[scales[index]] = width;
    });
  }

  // press space button call nextPage function and save data in database.
  const spaceKeyPressHandler = async (event) => {
    if (event.key === " ") {
      RemovingEvent();
      updateRatingsFromFillWidths();
      const responseTime = Date.now()-startTime;
  //    console.log(responseTime);
  //    console.log(ratings);
      // await nextPage();
      dispatch("ratingsChanged", { ratings: ratings, responseTime: responseTime, startTime: startTime });
    }
  };

  // Remove function should be called immediately when the fired space and complete the actions accordingly
  function RemovingEvent() {
    window.removeEventListener("keydown", spaceKeyPressHandler);
  }

  onMount(() => {
    startTime = Date.now();
    window.addEventListener("keydown", spaceKeyPressHandler);
  });
</script>

<!-- ------------- Svelte + html section ---------->
<div class="container w-full h-full flex justify-center items-center">
  <div class="wrapper mt-10 flex justify-center flex-col gap-1">
    <div class="instruction mb-3 text-[19px]">
      {instructions}
    </div>
    <!-- Your existing code for scale_tabs -->
    {#each scales as scale, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->

      <div class="scale_tab flex gap-0.5 justify-center items-center w-[450px]">
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

          <!-- JS + HTML section -->
          <!-- Display selected points and vertical lines -->
          {#if ratings[scale] > 0}
            <div class="selected-point" style={`left: ${ratings[scale]}%;`} />
          {/if}
        </div>
        <div class="scale_name flex justify-start ml-1" />
        <p class="w-[220px] justify-start text-[19px]">{scale}</p>
      </div>
    {/each}

    <!-- press space button -->
    <p class="mt-3 text-[19px]">Press "space" when finished</p>
  </div>
</div>

<style>
  .scale_tab {
    min-width: 450px;
  }
  .selected-point {
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: black;
    opacity: 0.8;
  }
</style>
