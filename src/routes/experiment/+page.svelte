<!-- This is the main experiment script which runs in the pop-up window-->
<script>
  import "@fontsource/roboto";
  // This is the task progress handler
  import { currentPageNumber } from "../../store/pageSteps";
  import { parseURLParameters, getVideoParams, getSessionData, chooseStimuli, stimURL , retrieveRatingWords, shuffleRatingWords} from "../../constants/utils";
  import { emotionsListShuffled } from "../../store/index";
  // parameters fot the session that are stored in the store so different components can read them
  import { userID, hitId, WatchedVideos, rewind_video, VideosURLs } from "../../store/index";


  import { onMount } from "svelte";
  // Components/screens for diffrent stages of the App
  import Consent from "../../screens/Consent.svelte";
  import Welcome from "../../screens/Welcome.svelte";
  import BotCheckWord from "../../components/BotCheckWord.svelte";
  import BotCheckMovie from "../../components/BotCheckMovie.svelte";
  import TaskInstructions from "../../screens/TaskInstructions.svelte";


 

  import ScreenTen from "../../screens/screenTen.svelte";
  import ScreenEleven from "../../screens/screenEleven.svelte";
  import ScreenTweleve from "../../screens/screenTweleve.svelte";
  import ScreenThirteen from "../../screens/screenThirteen.svelte";
  import ScreenFourteen from "../../screens/screenFourteen.svelte";
  import TrialFinishedError from "../../components/TrialFinishedError.svelte";

  let currentPage;

  let userId;
  let taskId;
  let sessionId;
  let platform;
  let videoParams;
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

    videoParams = await getVideoParams();
    console.log(" video parameters:", videoParams);

    sessionData = await getSessionData(sessionId);

    if (sessionData === null) {
      console.log("new session");
      curStim = await chooseStimuli(userId, videoParams.includedStim)
      console.log('Stim for new session:', curStim);
    } else if (sessionData.status === "complete") {
      console.log("session complete, route to completion page");
    } else {
      console.log("Session Status:", sessionData.status);
      console.log("Session Stim:", sessionData.stimuli);
    }
    const curStimURL = await stimURL(curStim);
    console.log(curStimURL);

    const emotions = await retrieveRatingWords('emotions');
    console.log(emotions);
    const shuffledEmotions = shuffleRatingWords(emotions)
    emotionsListShuffled.set(shuffledEmotions);
    console.log(shuffledEmotions);

    currentPageNumber.subscribe((value) => {
      currentPage = value;
      ChangeTitle();
    });
  });
</script>

{#if currentPage === 0}
  <Consent />
{:else if currentPage === 1}
  <Welcome />
{:else if currentPage === 2}
  <BotCheckWord />
{:else if currentPage === 3}
  <BotCheckMovie />
{:else if currentPage === 4}
  <TaskInstructions />


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
{:else if currentPage === 20}
  <TrialFinishedError />
{/if}
