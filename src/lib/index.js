import { writable } from "svelte/store";
export let loading = writable(false);
export let userID = writable("");
export let hitId = writable("");
export let Testing = writable(false);
// humanverification emotion name
export let verifyEmotionName = writable("");
