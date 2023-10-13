<!-- This is the main experiment script which runs in the pop-up window-->
<script>
  import "@fontsource/roboto";
  // This is the task progress handler
  import { currentPageNumber } from "../../store/pageSteps";
  import { parseURLParameters, getVideoParams, getSessionData, chooseStimuli, stimData , createBreaks, retrieveRatingWords, shuffleRatingWords} from "../../constants/utils";
  import { userId, taskId, sessionId, platform, videoParams, curStim, curStimData, breakPoints, emotionsListShuffled } from "../../store/index";
  // parameters fot the session that are stored in the store so different components can read them


  import { onMount } from "svelte";
  // Components/screens for diffrent stages of the App
  import Consent from "../../screens/Consent.svelte";
  import Welcome from "../../screens/Welcome.svelte";
  import BotCheckWord from "../../components/BotCheckWord.svelte";
  import BotCheckMovie from "../../components/BotCheckMovie.svelte";
  import TaskInstructions from "../../screens/TaskInstructions.svelte";
  import MovieWithBreaks from "../../components/MovieWithBreaks.svelte";


  let currentPage;
  let sessionData;


  // function definition to change the document title
  const ChangeTitle = () => {
    document.title = "Psychology Experiment";
  };
  const { parsedUserId, parsedTaskId, parsedSessionId, parsedPlatform } = parseURLParameters();
  // Set the values in the store
  userId.set(parsedUserId);
  taskId.set(parsedTaskId);
  sessionId.set(parsedSessionId);
  platform.set(parsedPlatform);
  console.log("User ID:", $userId);
  console.log("Task ID:", $taskId);
  console.log("Session ID:", $sessionId);
  console.log("Platform:", $platform);

  onMount(async () => {
    //({ userId, taskId, sessionId, platform } = parseURLParameters());
    //const { parsedUserId, parsedTaskId, parsedSessionId, parsedPlatform } = parseURLParameters();
  
    sessionData = await getSessionData($sessionId);

    if (sessionData === null) {
      console.log("new session");
      videoParams.set(await getVideoParams());
      console.log(" video parameters:", $videoParams);
      curStim.set(await chooseStimuli($userId, $videoParams.includedStim))
      console.log('Stim for new session:', $curStim);
      curStimData.set(await stimData($curStim));
      breakPoints.set(createBreaks($curStimData.duration, $videoParams));
      console.log($breakPoints);
    } else if (sessionData.status === "complete") {
      console.log("session complete, route to completion page");
    } else {
      console.log("Session Status:", sessionData.status);
      console.log("Session Stim:", sessionData.stimuli);
    }

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
{:else if currentPage === 5}
  <MovieWithBreaks />
{/if}


