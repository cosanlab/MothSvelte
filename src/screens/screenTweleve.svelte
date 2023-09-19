<script>
  import { currentPageNumber } from "../store/pageSteps";
  import { ScreenTwelve } from "../constants/constants";
  import { userID, hitId } from "../store/index";
  import { db } from "../config/firebase";
  import { collection, addDoc, doc, setDoc } from "firebase/firestore";
  import { loading, videoRefrence} from "../store/index";

  // all values setter objects
  const demographicData = {
    gender: "",
    age: "",
    ethnicity: "",
    race: "",
    feedback: "",
  };

  // store form data into firebase
  const storeData = async () => {
    loading.set(true);

    const demographicDataRef = doc(
      db,
      "study",
      $hitId,
      "users",
      $userID,
      $videoRefrence,
      "DemographicData"
    );

    try {
      await setDoc(demographicDataRef, {
        data: demographicData,
      });
      loading.set(false);
      console.log("Data stored successfully");
    } catch (error) {
      console.log(error);
      loading.set(false);
    }
  };
  // Triggered next page if everything is working correctly
  const NextPageHandler = () => {
    currentPageNumber.set(12);
  };

  // Handle the click event
  const clickHandler = async () => {
    // If the form has filled by user then store in the firebase store
    await storeData();
    NextPageHandler();
  };
</script>

<!-- CONTENT SECTION -->
<div class="container w-full h-full flex justify-center items-center">
  <div
    class="wrapper flex flex-col gap-7 justify-center items-center text-gray-700"
  >
    <div class="firstPart mt-2 flex flex-col justify-center items-start gap-1">
      <p class=" mx-auto">
        {ScreenTwelve.THANKS_MESSAGE}
      </p>
      <p class="italic font-semibold">
        {ScreenTwelve.NOTE_MESSAGE}
      </p>
    </div>
    <!-- gender selection -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">Your Gender:</h2>
      <input
        bind:value={demographicData.gender}
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Age selection -->
    <div class="center-div flex flex-col justify-center items-center gap-4">
      <h2 class="flex-wrap text-center font-bold">Your Age:</h2>
      <input
        bind:value={demographicData.age}
        type="number"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Your Ethnicity -->
    <div class="center-div flex flex-col justify-center items-center gap-1">
      <h2 class="flex-wrap text-center font-bold">Your Ethnicity:</h2>

      <p class="flex-wrap text-center">
        {ScreenTwelve.COPY_PASTE_MSG}
      </p>
      <!-- list -->
      <ul class="list-disc my-3">
        <li>Hispanic</li>
        <li>Not Hispanic</li>
        <li>Other</li>
      </ul>
      <!-- input tag to enter one of the list task -->
      <input
        bind:value={demographicData.ethnicity}
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Your RACE -->
    <div class="center-div flex flex-col justify-center items-center gap-1">
      <h2 class="flex-wrap text-center font-bold">Your Race:</h2>
      <p class="flex-wrap text-center">
        {ScreenTwelve.COPY_PASTE_MSG}
      </p>
      <!-- list -->
      <ul class="list-disc my-4 text-center">
        <li>American Indian / Alaksan Native</li>
        <li>Asian / Aslan American</li>
        <li>Black / African American</li>
        <li>Native Hawalian / Other Pacific Islander</li>
        <li>White</li>
        <li>Multi</li>
        <li>Other</li>
      </ul>
      <!-- input tag to enter one of the list task -->
      <input
        bind:value={demographicData.race}
        type="text"
        class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
      />
    </div>

    <!-- Feedback section -->

    <div
      class="feedback-section flex flex-col justify-center items-center gap-3"
    >
      <p>{ScreenTwelve.FEEDBACK_LABEL}</p>
      <!-- feedback text area -->
      <textarea
        bind:value={demographicData.feedback}
        name="feedback"
        id="feedback"
        cols="40"
        rows="4"
        class="border border-black pl-2"
      />
    </div>
    <!-- Continue button -->
    <button
      on:click={clickHandler}
      class={`py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200 mb-3 ${
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
