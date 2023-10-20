<!-- This is the main experiment script which runs in the pop-up window-->
<script>
  import "@fontsource/roboto";

  // Functions that the app is using
  import {
    consoleIfDev,
    parseURLParameters,
    loginToDB, 
    createUser, 
    getVideoParams,
    getSessionData,
    chooseStimuli,
    stimData,
    createBreaks,
    retrieveRatingWords,
    shuffleRatingWords,
  } from "../../constants/utils";

  // parameters for the session that are stored in the store so different components can read them
  import {
    sessionData,
    currentPageNumber,
    curSession,
  } from "../../store/index";
  
  import { onMount } from "svelte";

  // Components/screens for diffrent stages of the App
  import Consent from "../../screens/Consent.svelte";
  import Welcome from "../../screens/Welcome.svelte";
  import BotCheckWord from "../../components/BotCheckWord.svelte";
  import BotCheckMovie from "../../components/BotCheckMovie.svelte";
  import TaskInstructions from "../../screens/TaskInstructions.svelte";
  import MovieWithBreaks from "../../components/MovieWithBreaks.svelte";
  import PostTaskQuest from "../../screens/PostTaskQuest.svelte";
  import Demographics from "../../screens/Demographics.svelte";
  import Complete from "../../screens/Complete.svelte";
  import NoAvailableStim from "../../screens/NoAvailableStim.svelte";
  import FailedBotCheck from "../../screens/FailedBotCheck.svelte";
  import PermissionError from "../../screens/PermissionError.svelte";

  const completeRoute = import.meta.env.VITE_COMPLETION_ROUTE;
  consoleIfDev(completeRoute);

  let currentPage;

  // function definition to change the document title
  const ChangeTitle = () => {
    document.title = "Psychology Experiment";
  };
  const { userId, taskId, sessionId, platform } = parseURLParameters();
  curSession.set(sessionId);
  // Set the values in the store
  consoleIfDev("User ID:", userId);
  consoleIfDev("Task ID:", taskId);
  consoleIfDev("Session ID:", sessionId);
  consoleIfDev("Platform:", platform);

  onMount(async () => {
    // First, try to log in with the user
    try {
      await loginToDB(userId);
      consoleIfDev('User is logged in.');
    } catch (error) {
      // If login fails, create a new user and then try logging in again
      console.error('Login failed. Creating a new user...');

      try {
        await createUser(userId);
        consoleIfDev('User created successfully. Logging in...');
        await loginToDB(userId);
        consoleIfDev('User is logged in.');
      } catch (createUserError) {
        console.error('User creation or login failed:', createUserError);
        currentPageNumber.set(18);
      }
    }
      
    //const { parsedUserId, parsedTaskId, parsedSessionId, parsedPlatform } = parseURLParameters();
    sessionData.set(await getSessionData(sessionId));

    if ($sessionData === null) {
      consoleIfDev("new session");
      const videoParams = await getVideoParams();
      consoleIfDev(" video parameters:", videoParams);
      const curStim = await chooseStimuli(userId, videoParams.includedStim);
      if (curStim === null) {
        consoleIfDev("User saw all included data in task");
        currentPageNumber.set(19);
      }
      consoleIfDev("Stim for new session:", curStim);
      const curStimData = await stimData(curStim);
      const breakPoints = createBreaks(curStimData.duration, videoParams);
      consoleIfDev(breakPoints);
      const emotions = await retrieveRatingWords("emotions");
      const shuffledEmotions = shuffleRatingWords(emotions);
      consoleIfDev(shuffledEmotions);

      sessionData.set({
        userId: userId,
        taskId: taskId,
        platform: platform,
        videoParams: videoParams,
        stimuli: curStim,
        stimData: curStimData,
        breakpoints: breakPoints,
        shuffledEmotions: shuffledEmotions,
        status: "init",
        completedSegments: 0,
        ratings: [],
        attemptsStartTimestamps: [],
      });
      consoleIfDev("SessionData:", $sessionData);
    } else if ($sessionData.status === "complete") {
      currentPageNumber.set(8);
      consoleIfDev("session complete, route to completion page");
    } else if ($sessionData.status === "running") {
      currentPageNumber.set(4);
      consoleIfDev("Session Linked:");
      consoleIfDev("SessionData:", $sessionData);
    } else if ($sessionData.status === "postTaskQuestionnaire") {
      currentPageNumber.set(6);
      consoleIfDev("linking back to post task questionnaire");
    } else if ($sessionData.status === "demographics") {
      currentPageNumber.set(7);
      consoleIfDev("linking back to demographics questionnaire");
    } else {
      console.error("Invalid session status:", $sessionData.status);
    }

    currentPageNumber.subscribe((value) => {
      currentPage = value;
      ChangeTitle();
    });
  });

  // Add logic to detect when the experiment is completed, e.g., when the user clicks a "Finish" button
  function finishExperiment() {
    // Set the location of the main window based on the platform
    if (platform === "debug") {
      // Redirect to the '/complete' URL in debug mode
      window.opener.location.href = "/complete";
    } else {
      // Redirect to an external URL in non-debug mode
      window.opener.location.href = completeRoute;
    }
    window.close();
  }
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
{:else if currentPage === 9}
  {finishExperiment()} 
{:else if currentPage === 18}
  <PermissionError />
{:else if currentPage === 19}
  <NoAvailableStim />
{:else if currentPage === 20}
  <FailedBotCheck />
{/if}
