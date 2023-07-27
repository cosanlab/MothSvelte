<script>
  import logo from "../assets/logo.png";
  import "@fontsource/roboto";
  import { SecondPage } from "../constants/constants";

  const openNewWindow = () => {
    const customWidth = 1100; // Set your desired custom width here
    const windowFeatures = `width=${customWidth},height=${
      window.innerHeight + 80
    },left=0,top=0`;

    window.open(
      "/consent?hitId=debugOr0wK&assignmentId=debugRuNdu&workerId=debug0SdjT&mode=debug",
      "popupWindow",
      windowFeatures
    );
  };
</script>

<div class="container w-full h-full mt-8 ml-2 md:ml-6">
  <div class="wrapper w-full mx-3 flex gap-6 h-auto overflow-x-hidden">
    <div
      class="left w-[150px] xl:h-[132px] h-[129px] border border-gray-300 p-[2px]"
    >
      <img
        src={logo}
        class="w-full h-auto min-w-[140px] min-h-[120px]"
        alt="projectLabPic"
      />
    </div>

    <div class="right w-[85%] h-auto flex flex-col gap-2">
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
        class="bg-blue-700 opacity-75 text-white w-40 p-2 px-2 text-lg border-2 border-blue-700 rounded-md hover:bg-blue-800  active:border-2 focus:border-2 focus:border-black active:border-black "
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
