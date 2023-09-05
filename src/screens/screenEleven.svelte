<script>
  import { currentPageNumber } from "../lib/pageSteps";
  import { userID,hitId } from "../lib/index";
  import {Screen_Eleven} from "../constants/constants";
  import {db} from "../config/firebase";
  import { addDoc, collection, doc } from "firebase/firestore";
  import { loading } from "../lib/index";
  
 
  // temporary variables
  let question = {
     storySummary : "",
     dominantEmotion : "",
  }
 
  // Triggered next page if everything is working correctly
  const NextPageHandler = () => {
    currentPageNumber.set(11);
  };

  
  // create or store data into firebase
  const createData = async (emtion, story) => {
    loading.set(true);
    try {
    await addDoc(
        collection(doc(collection(db, $hitId), $userID), "FollowUp-Questions"),
        {
          dominantEmotion: emtion,
          storySummary: story,
        }
      );
     loading.set(false);
    } catch (error) {
      console.log(error)
      loading.set(false);
    }
  };

  // Handle the click event
  const clickHandler = async () => {
    const trimmedStorySummary = question.storySummary.trim();
    const trimmedDominantEmotion = question.dominantEmotion.trim();
    if (!trimmedStorySummary  || !trimmedDominantEmotion) {
      window.alert("Please fill the fields for better experience");
    } else {
      await createData(trimmedDominantEmotion, trimmedStorySummary);
      NextPageHandler();
    }
  };
</script>

<!-- CONTENT SECTION -->
<div
  class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
  <div
    class="wrapper mx-4 flex flex-col gap-7 justify-center items-center text-lg text-gray-700"
  >
    <p>
      {Screen_Eleven.THANKS_MESSAGE}
    </p>
    <!-- centered div -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">
        {Screen_Eleven.SUMMARIZE_STORY_LABEL}
      </h2>
      <!-- textarea -->
      <textarea
        name="story"
        bind:value={question.storySummary}
        id="story"
        cols="50"
        rows="3"
        class="border border-black text-sm px-1"
      />
    </div>

    <!-- last div or container -->
    <div class="last flex flex-col justify-center items-center gap-4">
      <h2 class="font-bold">
        {Screen_Eleven.DOMINANT_EMOTION_LABEL}
      </h2>
      <!-- input filed -->
      <input
        type="text"
        bind:value={question.dominantEmotion}
        class="w-[15rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

   <!-- Continue button -->
    <button
      on:click={clickHandler}
      class={`py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200 ${
        $loading && "bg-gray-100 px-8 "
      }`}
    >
      {#if $loading}
        <div
          class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      {:else}
        Continue
      {/if}
    </button>
  </div>
</div>
