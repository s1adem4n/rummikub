<script lang="ts">
  import { createSortedPlayersStore, type GameStore } from "./stores";
  import Player from "./Player.svelte";
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Plus from "virtual:icons/fa6-solid/plus";
  import Play from "virtual:icons/fa-solid/play";
  import Pause from "virtual:icons/fa-solid/pause";
  import Reset from "virtual:icons/fluent/arrow-reset-24-filled";

  export let game: GameStore;

  let sortedPlayers = createSortedPlayersStore(game);

  setContext("game", game);

  const eventDispatcher = createEventDispatcher<{ exit: undefined }>();

  onMount(() => {
    const interval = setInterval(() => {
      game.tick();
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:window on:keydown={game.next} />

<button class="relative h-full w-full grid grid-cols-2" on:click={game.next}>
  {#each $sortedPlayers as player}
    <Player
      {...player}
      active={$game.activePlayer === player.id}
      players={$game.players.length}
    />
  {/each}

  {#if $game.paused}
    <button
      class="absolute z-50 inset-0 w-full bg-black/50 backdrop-blur-sm flex flex-col sm:flex-row gap-12 justify-center items-center"
      on:click={(e) => {
        e.stopPropagation();
        $game.paused = false;
      }}
      transition:fade={{ duration: 200 }}
    >
      <button
        class="bg-white aspect-square rounded-full flex items-center justify-center"
        style="height: 15dvh;"
        transition:fly={{ y: 400, duration: 200 }}
        on:click={() => {
          eventDispatcher("exit");
        }}
      >
        <Plus class="rotate-45 w-2/3 h-2/3 text-red-500" />
      </button>

      <button
        class="bg-white aspect-square rounded-full flex items-center justify-center"
        style="height: 15dvh;"
        on:click={() => {
          game.reset();
        }}
        transition:fly={{ y: 400, duration: 200 }}
      >
        <Play class="w-1/2 h-1/2 text-green-500" />
      </button>
      <button
        class="bg-white aspect-square rounded-full flex items-center justify-center"
        style="height: 15dvh;"
        on:click={() => {
          game.reset();
        }}
        transition:fly={{ y: 400, duration: 200 }}
      >
        <Reset class="w-2/3 h-2/3 text-gray-800" />
      </button>
    </button>
  {/if}

  <button
    class="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center aspect-square top-1/2 left-1/2 text-gray-800 shadow-lg"
    style="width: {$game.players.length % 4 === 0 ||
    ($game.players.length + 1) % 4 === 0
      ? '15dvh'
      : '7vw'};"
    on:click={(e) => {
      e.stopPropagation();
      $game.paused = !$game.paused;
    }}
  >
    <Pause class="w-1/2 h-1/2" />
  </button>
</button>
