// authStore.js
import { writable } from "svelte/store";

// for saving names
export const currentPageNumber = writable(0);
export const randomNumber = writable("");
export const trialTimes = writable(0);
export const videoCurrentTime = writable(0.0);
export const EmotionScaleModel = writable(false);
export let videoTimeStamp = writable(135.5);
export let selectedRecords = writable([]); // Array to store selected records and mark the vertical line accordingly
export let showSelectedPoints = writable(false);
