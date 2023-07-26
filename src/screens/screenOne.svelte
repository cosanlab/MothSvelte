<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../lib/pageSteps";
  import { FirstScreen } from "../constants/constants";
  // NextPage

  const NextPageHandler = () => {
    currentPageNumber.set(1);
  };
</script>

<div class="container w-full h-screen flex justify-center mt-5">
  <div
    class="wrapper flex flex-col xl:w-[53%] lg:w-[80%] md:w-[90%] h-auto gap-4"
  >
    <!-- heading -->
    <h1 class="text-4xl">{FirstScreen.TITLE}</h1>
    <!-- text content -->
    <p class="text-lg -mt-2">
      {FirstScreen.SUBTITLE}
    </p>
    <!-- break line -->
    <hr />

    <!-- content section -->
    <section
      class="p-5 bg-gray-100 w-full flex flex-col border-2 border-gray-300 rounded-md"
    >
      <strong class="italic text-sm mb-2"
        >{FirstScreen.INSTRUCTION_MESSAGE}</strong
      >
      <!-- content -->
      <div class="content">
        <p class="italic text-sm mb-2 text-black">
          {FirstScreen.CONTENT1}
        </p>

        <p class="text-sm mb-2">
          {FirstScreen.CONTENT2}
        </p>

        <p class="text-sm mb-2">
          {FirstScreen.CONTENT3}
        </p>

        <p class="text-sm mb-2">
          {FirstScreen.CONTENT4}
          <a
            href="mailto:cosanlab@gmail.com"
            class="text-blue-600 hover:text-blue-800 hover:underline">{FirstScreen.EMAIL}</a
          >
        </p>

        <p class="text-sm mb-2">
          {FirstScreen.CONTENT5}
        </p>
      </div>
      <!-- print as a copy in pdf -->
      <button
        on:click={() => window.print()}
        class="printbtn flex gap-1 justify-center items-center p-1 border border-gray-400 w-36 bg-white text-[12px] mt-2 rounded-sm hover:bg-gray-200 active:border-2 focus:border-2 focus:border-black active:border-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-printer-fill text-[10px]"
          viewBox="0 0 16 16"
        >
          <path
            d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"
          />
          <path
            d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"
          />
        </svg>
        {FirstScreen.PRINT_BUTTON}</button
      >
    </section>

    <hr />

    <!-- last section -->
    <div class="last flex flex-col gap-3">
      <p class="text-xl">{FirstScreen.QUESTION}</p>
      <!-- buttons -->
      <div class="buttons flex justify-around mx-8 mt-3 mb-2 text-[20px]">
        <button
          class="p-1 px-2 pb-2 bg-blue-500 flex justify-center items-center text-white border-2 text-center border-blue-500 opacity-80 hover:opacity-100 rounded-md active:border-2 focus:border-2 focus:border-black active:border-black"
          on:click={NextPageHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="25"
            fill="currentColor"
            class="bi bi-check-lg custom-svg"
            viewBox="2 1 16 12"
          >
            <path
              d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
            />
          </svg>
          {FirstScreen.AGREE_BUTTON}</button
        >
        <!-- second button -->
        <button
          class="p-1 px-2 bg-red-600 flex justify-center items-center text-white border-2 border-red-600 opacity-80 hover:opacity-100 rounded-md active:border-2 focus:border-2 focus:border-black active:border-black"
          on:click={() => window.close()}
          >{FirstScreen.DISAPPROVE_BUTTON}</button
        >
      </div>
    </div>
  </div>
</div>

<!-- styling section -->
<style>
  p,
  h1 {
    font-family: "Roboto", sans-serif;
  }
  .printbtn {
    font-family: "Roboto", sans-serif;
  }
</style>
