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
// --- re-wind video parameter
export let rewind_video = writable(0);