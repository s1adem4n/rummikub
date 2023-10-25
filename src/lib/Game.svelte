<script lang="ts">
  import { type GameStore } from "./stores";
  import Player from "./Player.svelte";
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import Icon from "@iconify/svelte";
  import { fly } from "svelte/transition";
  export let game: GameStore;

  setContext("game", game);

  const eventDispatcher = createEventDispatcher<{ exit: undefined }>();

  onMount(() => {
    const interval = setInterval(() => {
      game.tick();
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:window
  on:click={() => {
    game.next();
  }}
/>

<div class="relative h-full w-full grid grid-cols-2">
  {#each $game.players as player, i}
    <Player
      {...player}
      index={i}
      active={$game.activePlayer === player.name}
      players={$game.players.length}
    />
  {/each}

  <button
    class="top-1/2 left-1/2"
    on:click={(e) => {
      e.stopPropagation();
      $game.paused = !$game.paused;
    }}
  >
    {#if $game.paused}
      <Icon icon="fa-solid:play" class="w-1/2 h-1/2 text-sky-500" />
    {:else}
      <Icon icon="fa-solid:pause" class="w-1/2 h-1/2 text-sky-500" />
    {/if}
  </button>
  {#if $game.paused}
    <button
      class="top-1/4 left-1/2"
      on:click={(e) => {
        e.stopPropagation();
        console.log("exit");
        eventDispatcher("exit");
      }}
      in:fly={{ y: window.innerHeight / 4, duration: 200 }}
      out:fly={{ y: window.innerHeight / 4, duration: 200 }}
    >
      <!-- cancel icon (X) cross -->
      <Icon icon="fa6-solid:plus" class="rotate-45 w-2/3 h-2/3 text-red-500" />
    </button>
  {/if}
</div>

<style lang="postcss">
  button {
    width: max(10vw, 5rem);
    height: max(10vw, 5rem);
    @apply absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center;
  }
</style>
