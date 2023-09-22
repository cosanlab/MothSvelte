import { writable } from "svelte/store";
export let loading = writable(false);
export let userID = writable("");
export let hitId = writable("");
export let Testing = writable(false);
// humanverification emotion name
export let verifyEmotionName = writable("");
// ---- Videos filtering --------
export let VideosURLs = writable([]);
export let WatchedVideos = writable([]);
export let FilteredVideos = writable([]);
export let selectedVideo = writable("");
export let videoRefrence = writable("");

// stim-paramters
export let EndSpace = writable(0);
export let SampleRate = writable(0);
export let Spacing = writable(0);
export let StartSpace = writable(0);
// --------- saving page timer -------
export let ratingTimer = writable([]);
export let timer = writable([]);

export let ratingScreenTimings = [];


export let screenTimings = (screenTime) => {
    //  const formattedTime = screenTime.padStart(5, "0"); // Assuming screenTime is a string

    //  ratingScreenTimings.push(formattedTime);
    //  console.log("screenTimings array is:", ratingScreenTimings);
    //  return ratingScreenTimings;
    
const index = ratingScreenTimings.length + 1;
const obj = { [`screen${index}`]: screenTime };
ratingScreenTimings.push(obj);
console.log("screenTimings array is:", ratingScreenTimings);
return ratingScreenTimings;

};

