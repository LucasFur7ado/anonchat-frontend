import { writable } from "svelte/store";

export const userId = writable(null);
export const messages = writable([]);
export const username = writable(null);
