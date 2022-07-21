import { writable } from "svelte/store";

interface Metadata {
  title: string;
  headline?: string;
}

export const metadata = writable<Metadata>({ title: "" });
