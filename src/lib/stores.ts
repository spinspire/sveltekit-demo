import { writable } from "svelte/store";

interface Metadata {
  title: string;
  heading?: string;
}

export const metadata = writable<Metadata>({ title: "" });
