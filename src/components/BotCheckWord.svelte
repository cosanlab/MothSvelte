<script>
  import { currentPageNumber } from "../store/index";

  let randomWord = ""; // Variable to store the random word
  let inputValue1 = ""; // Content of textbox1
  let inputValue2 = ""; // Content of hidden (honeytrap) textbox
  let trial_Times = 0; // mistakes counter
  let maxAttempts = 3; // max number of allowed mistakes
  let currentScreen = 1; //variable to manage screen within component


  //---- function method to triggered next page for passing and failing check
  const NextPageHandler = () => {
    currentPageNumber.set(3);
  };

  const ErrorPageHandler = () => {
    currentPageNumber.set(20);
  };
 
  // Function to generate a random five-character word
  function generateRandomWord() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let word = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters.charAt(randomIndex);
    }
    return word;
  }

  randomWord = generateRandomWord()
  console.log(randomWord);

  function checkTextboxes() {
    if (randomWord.toLowerCase() == inputValue1 && inputValue2 == "") {
      NextPageHandler();
    }
    else {
      trial_Times += 1;
      console.log("This was mistake:", trial_Times);
      if (trial_Times < maxAttempts){
        inputValue1=""
        currentScreen = 3;
      } else {
        ErrorPageHandler();
      }
    }
  }

</script>

{#if currentScreen === 1}
  <!-- CONTENT SECTION -->
  <div
    class="container w-full h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
    >
      <p class="flex-wrap text-center">
        Just to make sure you're human, in the following screen there will be an empty textbox.
      </p>

      <p class="flex-wrap text-center">
        Please enter the word <b class="uppercase">{randomWord }</b> in lowercase letters
        to the textbox.
      </p>
      <button
        on:click={() => {currentScreen=2}}
        class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
        >Continue
        </button>
    </div>
  </div>
{/if}

{#if currentScreen === 2}
<div
class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
<div
  class="wrapper mx-4 flex flex-col gap-7 justify-center items-center text-xl text-gray-700"
>
  <h1>Textbox</h1>

  <input
    type="text"
    class="w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
    bind:value={inputValue1}
  />

  <input
    type="text"
    class="TextBOX2 hidden w-[11rem] text-sm p-2 h-6 border border-gray-900 rounded-sm"
    bind:value={inputValue2}
  />

  <button
    on:click={checkTextboxes}
    class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
    >Continue
  </button>
</div>
</div>
{/if}

{#if currentScreen === 3}
<div
class="container w-full h-screen flex justify-center items-center overflow-hidden"
>
<div
  class="wrapper mx-4 flex flex-col gap-3 justify-center items-center text-xl text-gray-700"
>
  <p class="flex-wrap text-center">Sorry, that was not the correct answer. Please try again.</p>

  <button
    on:click={() => {currentScreen=1}}
    class="py-1 border border-gray-400 text-sm rounded-md px-3 hover:bg-gray-200"
    >Continue
  </button>
</div>
</div>
{/if}

