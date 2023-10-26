<script lang="ts">
  import { createSortedPlayersStore, type GameStore } from "./stores";
  import Player from "./Player.svelte";
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import Icon from "@iconify/svelte";
  import { fly, fade } from "svelte/transition";
  export let game: GameStore;

  let sortedPlayers = createSortedPlayersStore(game);
  $: console.log($sortedPlayers);

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
      class="absolute z-50 inset-0 w-full bg-black/50 backdrop-blur-sm flex flex-col gap-12 justify-center items-center"
      on:click={(e) => {
        e.stopPropagation();
        $game.paused = false;
      }}
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <button
        class="bg-white aspect-square rounded-full flex items-center justify-center"
        style="height: 15dvh;"
        on:click={() => {
          game.reset();
        }}
        in:fly={{ y: window.innerHeight / 4, duration: 200 }}
        out:fly={{ y: window.innerHeight / 4, duration: 200 }}
      >
        <Icon
          icon="fluent:arrow-reset-24-filled"
          class="w-2/3 h-2/3 text-gray-800"
        />
      </button>
      <button
        class="bg-white aspect-square rounded-full flex items-center justify-center"
        style="height: 15dvh;"
        on:click={() => {
          console.log("exit");
          eventDispatcher("exit");
        }}
        in:fly={{ y: window.innerHeight / 4, duration: 200 }}
        out:fly={{ y: window.innerHeight / 4, duration: 200 }}
      >
        <Icon
          icon="fa6-solid:plus"
          class="rotate-45 w-2/3 h-2/3 text-red-500"
        />
      </button>
    </button>
  {/if}

  <button
    class="pause text-gray-800 shadow-lg"
    style="width: {$game.players.length % 4 === 0 ||
    ($game.players.length + 1) % 4 === 0
      ? '15dvh'
      : '8vw'};"
    on:click={(e) => {
      e.stopPropagation();
      $game.paused = !$game.paused;
    }}
  >
    {#if $game.paused}
      <Icon icon="fa-solid:play" class="w-1/2 h-1/2" />
    {:else}
      <Icon icon="fa-solid:pause" class="w-1/2 h-1/2" />
    {/if}
  </button>
</button>

<style lang="postcss">
  button.pause {
    @apply absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center aspect-square top-1/2 left-1/2;
  }
</style>
