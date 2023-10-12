<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../store/pageSteps";
  

  //----------- NextPage ----------
  const NextPageHandler = () => {
    currentPageNumber.set(1);
  };

</script>

<!-- svelte + html  -->
<div class="container w-full h-screen flex justify-center mt-5">
  <div
    class="wrapper flex flex-col xl:w-[53%] lg:w-[80%] md:w-[90%] h-auto gap-4"
  >
    <!-- heading -->
    <h1 class="text-4xl">We need your consent to proceed</h1>
    <!-- text content -->
    <p class="text-lg -mt-2">
      If you reload or close/reopen this page, you will be asked to provide consent again. But the task will resume where you left off; you will not have to repeat work you have already completed.
    </p>
    <!-- break line -->
    <hr />

    <!-- content section -->
    <section
      class="p-5 bg-gray-100 w-full flex flex-col border-2 border-gray-300 rounded-md"
    >
      <strong class="italic text-sm mb-2"
        >(Please scroll down to see all consent information.)</strong
      >
      <!-- content -->
      <div class="content">
        <p class="italic text-sm mb-2 text-black">
          Please read the following material that explains this research study. We want you to understand what you are being asked to do and what risks and benefits --if any-- are associated with the study. Consent with this form will indicate that you have been informed about the study and that you want to participate.
        </p>

        <p class="text-sm mb-2">
          This project is being conducted by researchers from the department of Psychological and Brain Sciences at Dartmouth College, Hanover, NH, USA. This study aims to understand how individuals experience different feelings in response to narratives.
        </p>

        <p class="text-sm mb-2">
          Your participation is voluntary. Participation involves periodically making behavioral judgments about how you are feeling in response to video/audio clips, pictures, and text excerpts. The clips will be from public radio or primetime television.
        </p>

        <p class="text-sm mb-2">
          If you decide to take part in this study, you may be asked to view a variety of media that vary in emotional content. If any of the media presented should make you feel too uncomfortable to continue with the study, you are free to immediately withdraw your participation without giving up payment. To be clear: you may immediately end your participation if any aspect of the research procedure makes you too uncomfortable to continue. Lastly, if you have any discomfort or concerns after viewing the media, you are encouraged to contact the principal investigator at
          <a
            href="mailto:cosanlab@gmail.com"
            class="text-blue-600 hover:text-blue-800 hover:underline"
            >cosanlab@gmail.com</a
          >
        </p>

        <p class="text-sm mb-2">
          The information collected will be anonymous and no identifying information will be stored with the data collected during the experiment. Identifying information will not be used in any presentation or paper written about this project and such presentations will represent the aggregation of data from groups of people.
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
        Print a copy of this</button
      >
    </section>

    <hr />

    <!-- last section -->
    <div class="last flex flex-col gap-3">
      <p class="text-xl">Do you understand and consent to these terms?</p>
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
          I agree</button
        >
        <!-- second button -->
        <button
          class="p-1 px-2 bg-red-600 flex justify-center items-center text-white border-2 border-red-600 opacity-80 hover:opacity-100 rounded-md active:border-2 focus:border-2 focus:border-black active:border-black"
          on:click={() => window.close()}
          >🚫 No thanks, I do not want to participate</button
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
