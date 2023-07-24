// authStore.js
import { writable } from "svelte/store";

// for saving names
export const currentPageNumber = writable(0);
export const randomNumber = writable("");
export const trialTimes = writable(0);
export const emotionPopup = writable(false);
export const videoTimeStore = writable(0.0);