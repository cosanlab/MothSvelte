<script>
    import "@fontsource/roboto";
import { currentPageNumber } from "../lib/pageSteps";


// removing event 
const RemovingEvent = () =>{
 window.removeEventListener('keydown', NextPageHandler);
}

    const NextPageHandler = () =>{
      currentPageNumber.set(2);
      // removing event 
      RemovingEvent();
    }

  // Add the on:keydown event handler to the window object
  window.addEventListener('keydown', NextPageHandler);
</script>

<!-- CONTENT SECTION -->
<div class="container w-full h-screen flex justify-center items-center overflow-hidden">
  <div class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700">
    
    <p class="flex-wrap text-center">Sorry, that was not the correct answer. Please try again!.</p>
    <p>Press any key to begin.</p>
    
  </div>

</div>

<!-- styling section -->
<style>
  p{
    font-family: "Roboto", sans-serif;
  }
 
</style>