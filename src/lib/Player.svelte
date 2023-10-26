<script lang="ts">
  import { fade } from "svelte/transition";
  import { formatTime } from "./utils";

  export let time: number;
  export let eliminated: boolean;
  export let active: boolean;
  export let id: number;
  export let players: number;

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-rose-500",
  ];

  const color = colors[id % colors.length];
</script>

<div
  class="{eliminated
    ? 'bg-gray-500'
    : color} flex flex-col w-full h-full justify-center items-center relative overflow-hidden"
  style="transition: opacity 400ms; opacity: {!active || eliminated ? 0.4 : 1};"
>
  <div
    class="z-10 font-bold text-white tabular-nums flex"
    style="font-size: min({150 / players}dvh,20vw); padding-bottom: {7.5 /
      players}dvh;"
  >
    {#each formatTime(time) as char}
      <span class="drop-shadow-lg">{char} </span>
    {/each}
  </div>
  <div
    class="absolute inset-0 font-bold text-white opacity-20 flex items-center justify-center"
    style="font-size: {330 / players}dvh;"
  >
    {id + 1}
  </div>
</div>
