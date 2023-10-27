<script lang="ts">
  import Game from "$lib/Game.svelte";
  import TimeInput from "$lib/TimeInput.svelte";
  import { createGameStore, type GameStore } from "$lib/stores";
  import Plus from "virtual:icons/fa-solid/plus";
  import CircleLeft from "virtual:icons/fa6-regular/circle-left";
  import { fly } from "svelte/transition";

  let playing = false;
  let initialTime = 120;
  let players = 4;

  let step = 0;

  let game: GameStore = createGameStore({
    players,
    initialTime,
  });
</script>

{#if playing}
  <div
    class="h-full w-full"
    in:fly={{ x: 200, delay: 200 }}
    out:fly={{ x: -200, duration: 200 }}
  >
    <Game
      {game}
      on:exit={() => {
        step = 0;
        playing = false;
      }}
    />
  </div>
{:else if step === 0}
  <div
    class="flex flex-col gap-2 items-center justify-center min-h-full max-w-md mx-auto p-4"
    in:fly={{ x: 200, delay: 200 }}
    out:fly={{ x: -200, duration: 200 }}
  >
    <h1 class="text-4xl font-bold mb-4">Spiele Timer</h1>
    <label class="w-full">
      Anzahl der Spieler:
      <div class="flex gap-2">
        <span class="font-bold">{players}</span>
        <input
          type="range"
          min="2"
          max="8"
          bind:value={players}
          class="w-full"
        />
        {#if players >= 8}
          <button on:click={() => players++}>
            <span class="sr-only">plus</span>
            <Plus class="w-4 h-4" />
          </button>
        {/if}
      </div>
    </label>
    <label class="w-full" for="time">
      Zeit pro Spieler:

      <TimeInput bind:time={initialTime} />
    </label>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
      on:click={() => {
        step = 1;
        game = createGameStore({
          players,
          initialTime,
        });
      }}
    >
      Weiter
    </button>
  </div>
{:else if step === 1}
  <div
    class="flex flex-col gap-2 items-center justify-center min-h-full max-w-md mx-auto p-4"
    in:fly={{ x: 200, delay: 200 }}
    out:fly={{ x: -200, duration: 200 }}
  >
    <h1 class="text-4xl font-bold mb-4 flex w-full items-end gap-2">
      <button on:click={() => (step = 0)}>
        <CircleLeft class="w-8 h-8" />
      </button>
      Spieler einrichten
    </h1>
    <button
      on:click={() => (playing = true)}
      class="bg-blue-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
    >
      Start
    </button>
    {#each $game.players as player, i}
      <div
        class="flex flex-col w-full p-2 border border-gray-300 rounded-md gap-2"
      >
        <span>
          Spieler {i + 1}
        </span>
        <label for="time">
          Zeit:
          <TimeInput bind:time={player.time} />
        </label>
      </div>
    {/each}
    <button
      on:click={() => (playing = true)}
      class="bg-blue-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
    >
      Start
    </button>
  </div>
{/if}
