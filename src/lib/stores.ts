import { writable } from "svelte/store";

interface Metadata {
  title: string;
  headline?: string;
  description?: string;
  date?: string;
  author?: string;
}

export const metadata = writable<Metadata>({ title: "" });
