
import { writable } from "svelte/store";
export let loading = writable(false);
export let userID = writable("");
export let hitId = writable("");
// humanverification emotion name
export let verifyEmotionName = writable("");