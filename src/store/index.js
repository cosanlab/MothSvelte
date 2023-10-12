import { writable } from "svelte/store";
export let loading = writable(false);
export let userID = writable(""); // storing userID in svelte-store when fetched dynamically from URL
export let hitId = writable("");  // storing hitId in svelte-store when fetched dynamically from URL
export let Testing = writable(false);
export let verifyEmotionName = writable(""); // storing randomize emotion name for human verification
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
// --- re-wind video parameter
export let rewind_video = writable(0);


export let emotionsListShuffled = writable([]);