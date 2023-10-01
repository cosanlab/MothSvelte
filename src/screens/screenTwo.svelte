<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../store/pageSteps";
  import { VideosURLs, hitId, userID, rewind_video } from "../store/index";
  import { SecondScreen } from "../constants/constants";
  import { onMount } from "svelte";
  import { shuffleEmotions } from "../constants/emotions";
  import { db } from "../config/firebase";
  import URlErrorScreen from "../components/URLsParametersError.svelte";

  import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    getDoc,
  } from "firebase/firestore";

  let URlError = false;

  // removing event
  const RemovingEvent = () => {
    window.removeEventListener("keydown", NextPageHandler);
  };

  const NextPageHandler = () => {
    currentPageNumber.set(2);
    // removing event
    RemovingEvent();
  };

  // Add the on:keydown event handler to the window object
  window.addEventListener("keydown", NextPageHandler);

  // getting data from firebase
  const RetrieveData = async () => {
    const videoRef = collection(db, "systemAssets");

    // Query documents where the "name" field is equal to "re-wind movie"
    const rewindQuery = query(
      videoRef,
      where("__name__", "==", "re-wind movie")
    );
    try {
      const querySnapshot = await getDocs(rewindQuery);

      if (!querySnapshot.empty) {
        const rewindDocument = querySnapshot.docs[0];
        const rewindData = rewindDocument.data();
        rewind_video.set(rewindData.rewind);
        console.log("The re-wind parameter is:", rewindData.rewind);
      } else {
        console.log("No documents found that match the query.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // --- below code is for retreiving video urls ----
    const queryRef = query(videoRef, where("__name__", "==", "videos-URLs"));
    let querySnapshot = await getDocs(queryRef);
    const files = []; // Initialize an empty array to store heartbeat values
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const file = { id, ...data };
      files.push(file);
    });
    // setting videos urls in videourls store
    VideosURLs.set(files[0].videos);
  };

  onMount(async () => {
    // if userID & hitID are not exist then redirecting to error page
    if (!$userID || !$hitId) {
      URlError = true;
      console.log("url parameters are not found");
    }

    RetrieveData();
    // Calling the shuffleEmotions function to shuffle the emotions each time
    shuffleEmotions();
  });
</script>

<!---------- SVELTE + HTML SECTION ---------->
{#if URlError}
  <URlErrorScreen />
{:else}
  <div
    class="container w-full h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-lg text-gray-700"
    >
      <h1>{SecondScreen.TITLE}</h1>

      <p class="flex-wrap text-center">{SecondScreen.INSTRUCTIONS}</p>

      <p class="flex-wrap text-center">
        {SecondScreen.INFORMATION} (<a
          href="mailto:cosanlab@gmail.com"
          class="text-blue-600 hover:text-blue-800 underline"
          >{SecondScreen.EMAIL}</a
        >), and <span class="font-bold"> {SecondScreen.EMPHASIS_MESSAGE}</span>
      </p>

      <p>{SecondScreen.THANKS_MESSAGE}</p>

      <p>{SecondScreen.KEY_PRESS}</p>
    </div>
  </div>
{/if}

<!-- styling section -->
<style>
  p {
    font-family: "Roboto", sans-serif;
  }
</style>
