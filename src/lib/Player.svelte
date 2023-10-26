<script lang="ts">
  import { formatTime } from "./utils";

  export let time: number;
  export let eliminated: boolean;
  export let active: boolean;
  export let id: number;
  export let players: number;

  const colors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#a855f7",
    "#ec4899",
    "#6366f1",
    "#10b981",
    "#d946ef",
    "#14b8a6",
    "#8b5cf6",
    "#f43f5e",
  ];

  const color = colors[id % colors.length];
</script>

<div
  class="{eliminated &&
    'bg-gray-500'} flex flex-col w-full h-full justify-center items-center relative overflow-hidden"
  style="transition: opacity 400ms; opacity: {!active || eliminated
    ? 0.4
    : 1}; background-color: {color}"
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
