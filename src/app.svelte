<script>
  import logo from "./assets/logo.png";
  import "@fontsource/roboto";
  import { generateRandomQueryString, consoleIfDev } from "./constants/utils.js";
  import { onMount } from "svelte";

  // below are the static/dummy parameters which can used for the demo purpose
  // let queryString = "hitId=taskId&workerId=userId&assignmentId=sessionId";
  // let queryString = "PROLIFIC_PID=userId&STUDY_ID=taskId&SESSION_ID=sessionId";

  let queryString = "";
  //--------- Open New Window -------
  function openNewWindow() {
    const customWidth = 1100; // Set your desired custom width here
    const windowFeatures = `width=${customWidth},height=${
      window.innerHeight + 80
    },left=0,top=0`;

    window.open(`/experiment?${queryString}`, "popupWindow", windowFeatures);
  }

  onMount(async () => {
    queryString = window.location.search.slice(1);
    if (queryString == "") {
      if (import.meta.env.DEV){
        queryString = generateRandomQueryString();
        consoleIfDev("There are no URL Parameters, generating random");
      }
    } else {
      consoleIfDev(queryString);
    }
  });
</script>

<div class="container w-full h-full mt-8 ml-2 md:ml-6 overflow-hidden">
  <div class="wrapper w-full mx-3 flex gap-6 h-auto">
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
      <h1 class="text-4xl">Thank you for accepting this study!</h1>

      <p class="text-lg">
        By clicking the following URL link, you will be taken to the experiment,
        including complete instructions and an informed consent agreement.
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
                <b>Warning:</b>
                Please disable pop-up blockers before continuing.
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
        Begin Experiment
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
