
import { writable } from "svelte/store";
export let loading = writable(false);
export let userID = writable("");
// humanverification emotion name
export let verifyEmotionName = writable("");