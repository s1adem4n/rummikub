<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  export let time: number;

  $: time = minutes * 60 + seconds;

  let minutes: number = Math.floor(time / 60);
  let seconds: number = time % 60;

  let elements: HTMLInputElement[] = [];
</script>

<div class="flex items-center gap-1">
  <div
    class="flex border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500 divide-x divide-gray-300 h-8"
  >
    <button
      on:click={() => {
        if (minutes > 0) {
          minutes--;
        }
      }}
    >
      <Icon icon="ic:round-minus" class="w-6 h-6" />
    </button>
    <input
      type="number"
      min="0"
      max="59"
      step="1"
      pattern="[0-9]*"
      inputmode="numeric"
      bind:this={elements[0]}
      on:input={(e) => {
        const value = Number(e.currentTarget.value);
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
        if (value > 59) {
          e.currentTarget.value = "59";
        }
        if (e.currentTarget.value.length === 0) {
          e.currentTarget.value = "0";
        }
      }}
      bind:value={minutes}
      class="w-8 text-center appearance-none focus:outline-none rounded-none"
    />
    <button
      on:click={() => {
        if (minutes < 59) {
          minutes++;
        }
      }}
    >
      <Icon icon="ic:round-plus" class="w-6 h-6" />
    </button>
  </div>
  <span class="text-2xl">:</span>
  <div
    class="flex border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500 divide-x divide-gray-300 h-8"
  >
    <button
      on:click={() => {
        if (seconds > 0) {
          seconds--;
        }
      }}
    >
      <Icon icon="ic:round-minus" class="w-6 h-6" />
    </button>
    <input
      type="number"
      min="0"
      max="59"
      step="1"
      pattern="[0-9]*"
      inputmode="numeric"
      bind:this={elements[1]}
      on:input={(e) => {
        const value = Number(e.currentTarget.value);
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
        if (value > 59) {
          e.currentTarget.value = "59";
        }
        if (e.currentTarget.value.length === 0) {
          e.currentTarget.value = "0";
        }
      }}
      bind:value={seconds}
      class="w-8 text-center appearance-none rounded-none focus:outline-none"
    />
    <button
      on:click={() => {
        if (seconds < 59) {
          seconds++;
        }
      }}
    >
      <Icon icon="ic:round-plus" class="w-6 h-6" />
    </button>
  </div>
</div>

<style>
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
</style>
