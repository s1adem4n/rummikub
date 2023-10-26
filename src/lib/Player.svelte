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
  ];

  const color = colors[id % colors.length];
</script>

<div
  class="{eliminated
    ? 'bg-gray-500'
    : color} flex flex-col w-full h-full justify-center items-center relative overflow-hidden"
  style="transition: opacity 300ms; opacity: {!active || eliminated ? 0.4 : 1};"
>
  <div
    class="z-10 font-bold text-white tabular-nums flex"
    style="font-size: min({150 / players}vh,20vw); padding-bottom: {7.5 /
      players}vh;"
  >
    {#each formatTime(time) as char}
      <span class="relative flex items-center justify-center"
        >{char}
        {#if char === "6" || char === "9"}
          <div
            class="absolute bg-white rounded-full z-50 aspect-square"
            style="bottom: 10%; width: 25%;"
            transition:fade={{ duration: 200 }}
          />
        {/if}
      </span>
    {/each}
  </div>
  <div
    class="absolute inset-0 font-bold text-white opacity-20 flex items-center justify-center"
    style="font-size: {330 / players}vh;"
  >
    {id + 1}
  </div>
</div>
