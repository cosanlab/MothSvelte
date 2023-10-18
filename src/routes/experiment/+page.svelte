<!-- This is the main experiment script which runs in the pop-up window-->
<script>
  import "@fontsource/roboto";
  // This is the task progress handler
  import { parseURLParameters, getVideoParams, getSessionData, chooseStimuli, stimData , createBreaks, retrieveRatingWords, shuffleRatingWords} from "../../constants/utils";
  import { sessionData, currentPageNumber, curSession } from "../../store/index";
  // parameters for the session that are stored in the store so different components can read them


  import { onMount } from "svelte";
  // Components/screens for diffrent stages of the App
  import Consent from "../../screens/Consent.svelte";
  import Welcome from "../../screens/Welcome.svelte";
  import BotCheckWord from "../../components/BotCheckWord.svelte";
  import BotCheckMovie from "../../components/BotCheckMovie.svelte";
  import TaskInstructions from "../../screens/TaskInstructions.svelte";
  import MovieWithBreaks from "../../components/MovieWithBreaks.svelte";
  import TrialFinishedError from "../../components/TrialFinishedError.svelte";
  import PostTaskQuest from "../../screens/PostTaskQuest.svelte";
  import Demographics from "../../screens/Demographics.svelte";
  import Complete from "../../screens/Complete.svelte";

  let currentPage;
  //let sessionData;


  // function definition to change the document title
  const ChangeTitle = () => {
    document.title = "Psychology Experiment";
  };
  const { userId, taskId, sessionId, platform } = parseURLParameters();
  curSession.set(sessionId);
  // Set the values in the store
  console.log("User ID:", userId);
  console.log("Task ID:", taskId);
  console.log("Session ID:", sessionId);
  console.log("Platform:", platform);

  onMount(async () => {
    //({ userId, taskId, sessionId, platform } = parseURLParameters());
    //const { parsedUserId, parsedTaskId, parsedSessionId, parsedPlatform } = parseURLParameters();
    sessionData.set(await getSessionData(sessionId));

    if ($sessionData === null) {
      console.log("new session");
      const videoParams = await getVideoParams();
      console.log(" video parameters:", videoParams);
      const curStim = await chooseStimuli(userId, videoParams.includedStim);
      if (curStim === null) {
        console.log("User saw all included data in task");
        currentPageNumber.set(19);
      }
      console.log('Stim for new session:', curStim);
      const curStimData = await stimData(curStim);
      const breakPoints = createBreaks(curStimData.duration, videoParams);
      console.log(breakPoints);
      const emotions = await retrieveRatingWords('emotions');
      const shuffledEmotions = shuffleRatingWords(emotions)
      console.log(shuffledEmotions);

      sessionData.set({
        userId:userId,
        taskId:taskId,
        platform:platform,
        videoParams: videoParams,
        stimuli: curStim,
        stimData: curStimData,
        breakpoints: breakPoints,
        shuffledEmotions: shuffledEmotions,
        status: "init",
        completedSegments: 0,
        ratings: [],
        attemptsStartTimestamps: []
      });
      console.log("SessionData:", $sessionData);

    } else if ($sessionData.status === "complete") {
      currentPageNumber.set(8);
      console.log("session complete, route to completion page");
    } else if ($sessionData.status === "running") {
      currentPageNumber.set(4);
      console.log("Session Linked:");
      console.log("SessionData:", $sessionData);
    } else if ($sessionData.status === "postTaskQuestionnaire") {
      currentPageNumber.set(6);
      console.log("linking back to post task questionnaire")
    } else if ($sessionData.status === "demographics") {
      currentPageNumber.set(7);
      console.log("linking back to demographics questionnaire")
    } else {
      console.error("Invalid session status:", $sessionData.status)
    }

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
{:else if currentPage === 5}
  <MovieWithBreaks />
{:else if currentPage === 6}
  <PostTaskQuest />
{:else if currentPage === 7}
  <Demographics />
{:else if currentPage === 8}
  <Complete />



{:else if currentPage === 20}
  <TrialFinishedError />
{/if}


