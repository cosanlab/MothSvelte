<script>
  import { onMount } from "svelte";
 import {Spacing, EndSpace, StartSpace, SampleRate } from "../store/index";
  // Define the parameters
  let sampleRate = $SampleRate; 
  let spacing = $Spacing; 
  let startSpace = $StartSpace; 
  let endSpace = $EndSpace;
  let stimLength = 528; 
  let breaks = [];
 // Function to calculate breaks
  function calculateBreaks() {
    let numBreaks = Math.floor(stimLength / sampleRate);
    let availableTimesRange = {
      start: startSpace,
      end: stimLength - endSpace
    };
    
    while (breaks.length < numBreaks) {
      let randomTime = getRandomTime(availableTimesRange);
      let minSpace = getMinSpace(breaks, randomTime);

      // Check if the minimum space between breaks is greater than or equal to spacing
      if (minSpace >= spacing) {
        breaks.push(randomTime);
        breaks.sort((a, b) => a - b); // Sort the breaks in ascending order
      }
    }
   
    console.log(breaks)
  }

  // Function to calculate the minimum space between the new break and existing breaks
  function getMinSpace(existingBreaks, newBreak) {
    let minSpace = Infinity;
    for (let i = 0; i < existingBreaks.length; i++) {
      let space = Math.abs(existingBreaks[i] - newBreak);
      if (space < minSpace) {
        minSpace = space;
      }
    }
    return minSpace;
  }

  // Function to generate a random time within the available times range
  function getRandomTime(range) {
    return range.start + Math.random() * (range.end - range.start);
  }
 

  onMount(()=>{
    console.log(`endSpace: ${$EndSpace} | starSpace: ${$StartSpace}`)
    calculateBreaks();
    
  })
</script>

<!-- HTML structure for displaying the breaks -->
<div>
  <ul>
    {#each breaks as Break}
      <li>{Break.toFixed(2)} seconds</li>
    {/each}
  </ul>
</div>

<!-- Button to trigger break calculation -->
<button on:click={calculateBreaks}>Calculate Breaks</button>
