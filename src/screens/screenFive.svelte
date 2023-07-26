<script>
  import { currentPageNumber, randomNumber } from "../lib/pageSteps";
  import { FiveScreen } from "../constants/constants";
  //---- function method to triggered next page whenever user click on continue button
  const NextPageHandler = () => {
    currentPageNumber.set(5);
  };
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
  >
    <p class="flex-wrap text-center">{FiveScreen.INSTRUCTIONS}</p>

    <p class="flex-wrap text-center">{FiveScreen.CONTENT}</p>

    <button
      on:click={NextPageHandler}
      class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
      >{FiveScreen.BUTTON}</button
    >
  </div>
</div>
