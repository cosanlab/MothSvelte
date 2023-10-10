<!-- This is the main experiment script which runs in the pop-up window-->
<script>
  import "@fontsource/roboto";
  // This is the task progress handler
  import { currentPageNumber } from "../../store/pageSteps";
  import { parseURLParameters, getSessionData, chooseStimuli, stimURL } from "../../constants/utils";


  // parameters fot the session that are stored in the store so different components can read them
  import { userID, hitId, WatchedVideos, rewind_video, VideosURLs } from "../../store/index";
  // database related functions
  import { db } from "../../config/firebase";
  import axios from "axios";

  import { onMount } from "svelte";
  // Components/screens for diffrent stages of the App
  import Consent from "../../screens/Consent.svelte";
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

  let userId;
  let taskId;
  let sessionId;
  let platform;
  let sessionData;
  let curStim;

  // function definition to change the document title
  const ChangeTitle = () => {
    document.title = "Psychology Experiment";
  };

  onMount(async () => {

    ({ userId, taskId, sessionId, platform } = parseURLParameters());
    console.log("User ID:", userId);
    console.log("Task ID:", taskId);
    console.log("Session ID:", sessionId);
    console.log("Platform:", platform);

    sessionData = await getSessionData(sessionId);

    if (sessionData === null) {
      console.log("new session");
      curStim = await chooseStimuli(userId)
      console.log('Stim for new session:', curStim);
    } else if (sessionData.status === "complete") {
      console.log("session complete, route to completion page");
    } else {
      console.log("Session Status:", sessionData.status);
      console.log("Session Stim:", sessionData.stimuli);
    }
    const curStimURL = await stimURL(curStim);
    console.log(curStimURL);

    currentPageNumber.subscribe((value) => {
      currentPage = value;
      ChangeTitle();
    });
  });
</script>

{#if currentPage === 0}
  <Consent />
{:else if currentPage === 1}
  <ScreenTwo />
{:else if currentPage === 2}
  <ScreenThree />
{:else if currentPage === 3}
sc  <StepFour />
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
