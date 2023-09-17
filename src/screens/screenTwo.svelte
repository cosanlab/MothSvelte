<script>
  import "@fontsource/roboto";
  import { currentPageNumber } from "../store/pageSteps";
  import { VideosURLs, WatchedVideos } from "../store/index";
  import { SecondScreen } from "../constants/constants";
  import { onMount } from "svelte";
import { db } from "../config/firebase";
  import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
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
  const RetrieveData = async() =>{
    // Reference to the "video-URLs" collection within "systemAssets"
 const videoRef = collection(db, "systemAssets");
 let queryRef = videoRef;
 queryRef = query(videoRef, where("__name__", "==", "videos-URLs"));

let querySnapshot = await getDocs(queryRef);
const files = []; // Initialize an empty array to store heartbeat values
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id =doc.id
      const file = { id,...data };
      files.push(file);
      
    });
    // setting videos urls in videourls store
      VideosURLs.set(files[0].videos)

  }

onMount(async()=>{

 RetrieveData();
})
</script>

<!-- CONTENT SECTION -->
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
        class="text-blue-600 hover:text-blue-800 underline">{SecondScreen.EMAIL}</a
      >), and <span class="font-bold"> {SecondScreen.EMPHASIS_MESSAGE}</span>
    </p>

    <p>{SecondScreen.THANKS_MESSAGE}</p>

    <p>{SecondScreen.KEY_PRESS}</p>
  </div>
</div>

<!-- styling section -->
<style>
  p {
    font-family: "Roboto", sans-serif;
  }
</style>
