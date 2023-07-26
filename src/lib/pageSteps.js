// authStore.js
import { writable } from "svelte/store";

// for saving names
export const currentPageNumber = writable(0);
export const randomNumber = writable("");
export const trialTimes = writable(0);
export const videoCurrentTime = writable(0.0);
export const EmotionScaleModel = writable(false);
