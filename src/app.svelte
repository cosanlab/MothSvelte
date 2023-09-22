<script>
  import logo from "./assets/logo.png";
  import "@fontsource/roboto";
  import { SecondPage } from "./constants/constants";
  import { onMount } from "svelte";

  // let queryString = "hitId=hitIdws5s4d&workerId=PD-slj543dfs&assignmentId=ASSIGNMENT_ID";
  // let queryString = "PROLIFIC_PID=65093680f0f29ac89b9a4519&STUDY_ID=UNSAVED-STUDY&SESSION_ID=0f9zflacv52c";

  let queryString = "";
  //--------- Open New Window -------
  const openNewWindow = () => {
    const customWidth = 1100; // Set your desired custom width here
    const windowFeatures = `width=${customWidth},height=${
      window.innerHeight + 80
    },left=0,top=0`;

    window.open(`/consent?${queryString}`, "popupWindow", windowFeatures);
  };

 

  onMount( async() => {
    queryString = window.location.search.slice(1);
    if (queryString == "") {
      console.log("There are no URL Parameters");
    } else {
      console.log(queryString);
    }

  });
</script>

<div class="container w-full h-full mt-8 ml-2 md:ml-6 overflow-hidden">
  <div class="wrapper w-full mx-3 flex gap-6 h-auto ">
    <div
      class="left w-[150px] xl:h-[132px] h-[129px] border border-gray-300 p-[2px]"
    >
      <img
        src={logo}
        class="w-full h-auto min-w-[140px] min-h-[120px]"
        alt="projectLabPic"
      />
    </div>

    <div class="right w-[80%] h-auto flex flex-col gap-2">
      <h1 class="text-4xl">
        {SecondPage.TITLE}
      </h1>

      <p class="text-lg">
        {SecondPage.SUBTITLE}
      </p>

      <div class="container mx-auto">
        <!-- Section: Design Block -->
        <section class="mb-2">
          <div
            class="alert alert-dismissible fade show items-center justify-between rounded-md bg-[#fcf8e3] border border-[#faebcc] py-4 px-4 text-center md:flex md:text-left"
          >
            <div
              class="mb-4 flex flex-wrap items-center justify-center md:mb-0 md:justify-start"
            >
              <!-- svelte-ignore a11y-missing-attribute -->
              <p class="text-[#8a6d3b] text-lg">
                <b>{SecondPage.WARNING_MESSAGE}</b>
                {SecondPage.INSTRUCTIONS}
              </p>
            </div>
          </div>
        </section>
        <!-- Section: Design Block -->
      </div>
      <!-- button -->
      <button
        class="bg-blue-700 opacity-75 text-white w-40 p-2 px-2 text-lg border-2 border-blue-700 rounded-md hover:bg-blue-800 active:border-2 focus:border-2 focus:border-black active:border-black"
        on:click={openNewWindow}
      >
        {SecondPage.BUTTON}
      </button>
    </div>
  </div>
</div>

<!-- styling section -->
<style>
  h1 {
    font-family: "Roboto", sans-serif;
  }
</style>
