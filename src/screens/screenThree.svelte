<script>
  import { onMount } from "svelte";
  import { currentPageNumber, randomNumber, trialTimes } from "../store/pageSteps";
  import {Spacing, EndSpace, StartSpace, SampleRate, rewind_video } from "../store/index";
  import { ThirdScreen } from "../constants/constants";
  import { db } from "../config/firebase";
  import { collection, getDocs, query, where } from "firebase/firestore";

  let randomWord = ""; // Variable to store the random word
  let trial_Times = 0;


  //---- function method to triggered next page whenever user click on continue button
  const NextPageHandler = () => {
    currentPageNumber.set(3);
  };

  //------------- Retrievig-Paramaters -----------------
  const RetrievingStimParamters = async() =>{
    // getting data from firebase
 const stimRef = collection(db, "systemAssets");
 let queryRef = stimRef;
 queryRef = query(stimRef, where("__name__", "==", "stim-paramters"));

let querySnapshot = await getDocs(queryRef);
const files = []; // Initialize an empty array to store heartbeat values
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id =doc.id
      const file = { id,...data };
      files.push(file);
      
    });
    let stim_parameters = files[0].paramters;
    Spacing.set(stim_parameters.spacing);
    EndSpace.set(stim_parameters.endSpace);
    StartSpace.set(stim_parameters.startSpace);
    SampleRate.set(stim_parameters.sampleRate);
  }
 
  // Function to generate a random five-character word
  function generateRandomWord() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let word = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters.charAt(randomIndex);
    }
    return word;
  }

  // Use onMount to call the generateRandomWord function and assign to global variable when the component is mounted
  onMount(() => {
    console.log("the re-wind time is: ", $rewind_video)
    // Retrieving stim-parameters method called
    RetrievingStimParamters();
//------------------------------------------------
    // generate five character words for textBox
    trialTimes.subscribe((value) => {
      trial_Times = value;
    });
    if(trial_Times > 0){
    randomNumber.subscribe((value) => {
    randomWord = value;
    });
    }
    // condition 
    if(trial_Times == 0){
    randomWord = generateRandomWord().toLowerCase();
    randomNumber.set(randomWord);
    }

  });
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
  >
    <p class="flex-wrap text-center">{ThirdScreen.WARNING_MESSAGE}</p>

    <p class="flex-wrap text-center">
      Please enter the word <b class="uppercase">{randomWord }</b> in lowercase letters
      to the textbox.
    </p>

    <!-- <p>{ThirdScreen.BOX2_MESSAGE}</p> -->

    <button
      on:click={NextPageHandler}
      class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
      >{ThirdScreen.BUTTON}</button
    >
  </div>
</div>
