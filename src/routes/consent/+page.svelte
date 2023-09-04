<!-- SCREEN ONE AFTER POP UP -->
<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../../lib/pageSteps";
  import { onMount } from "svelte";

  import ScreenOne from "../../screens/screenOne.svelte";
  import ScreenThree from "../../screens/screenThree.svelte";
  import ScreenTwo from "../../screens/screenTwo.svelte";
  import StepFour from "../../screens/stepFour.svelte";
  import ScreenFive from "../../screens/screenFive.svelte";
  import ScreenSix from "../../screens/screenSix.svelte";
  import HumanVerificatin from "../../screens/HumanVerificatin.svelte";
  import ScreenEight from "../../screens/screenEight.svelte";
  import ScreenNine from "../../screens/screenNine.svelte";
  import ScreenTen from "../../screens/screenTen.svelte";
  import ScreenEleven from "../../screens/screenEleven.svelte";
  import ScreenTweleve from "../../screens/screenTweleve.svelte";
  import ScreenThirteen from "../../screens/screenThirteen.svelte";
  import ScreenFourteen from "../../screens/screenFourteen.svelte";

  let currentPage;
  // let queryString;
  // let hitId;
  // let workerId;
  // function definition to change the document title
  const ChangeTitle = () => {
    document.title = "Psychology Experiment - Informed Consent Form";
  };

  // getting url parameters
   const getParams = () => {
    const params = new URLSearchParams(location.search);
   
    return params;
  };

  // onMount method is just like useEffect
  onMount(() => {
    //  queryString = window.location.search.slice(1);
    // if(queryString == ""){
    //   console.log('There are no URL Parameters')
    // }else{
    // console.log(queryString)
    // }
    //   const params = getParams();
    //    hitId = params.get("hitId");
    //    workerId =params.get("workerId"); 
    //   console.log("WORKER ID:", workerId)
    //   console.log("HitID:", hitId)

    

    currentPageNumber.subscribe((value) => {
      currentPage = value;
      ChangeTitle();
    });
  });
</script>

{#if currentPage === 0}
  <ScreenOne />
{:else if currentPage === 1}
  <ScreenTwo />
{:else if currentPage === 2}
  <ScreenThree />
{:else if currentPage === 3}
  <StepFour />
{:else if currentPage === 4}
  <ScreenFive />
{:else if currentPage === 5}
  <ScreenSix />
{:else if currentPage === 6}
  <HumanVerificatin />
{:else if currentPage === 7}
  <ScreenEight />
{:else if currentPage === 8}
  <ScreenNine />
{:else if currentPage === 9}
  <ScreenTen />
{:else if currentPage === 10}
  <ScreenEleven />
{:else if currentPage === 11}
  <ScreenTweleve />
{:else if currentPage === 12}
  <ScreenThirteen />
{:else if currentPage === 13}
  <ScreenFourteen />
{/if}
