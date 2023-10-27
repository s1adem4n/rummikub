<script lang="ts">
  import Minus from "virtual:icons/fa6-solid/minus";
  import Plus from "virtual:icons/fa6-solid/plus";

  export let time: number;

  $: time = minutes * 60 + seconds;

  let minutes: number = Math.floor(time / 60);
  let seconds: number = time % 60;

  let elements: HTMLInputElement[] = [];
</script>

<div class="flex items-center gap-1">
  <div
    class="flex border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-600 divide-x divide-gray-300 h-[42px]"
  >
    <button
      on:click={() => {
        if (minutes > 0) {
          minutes--;
        }
      }}
      class="h-full w-12 flex items-center justify-center"
    >
      <span class="sr-only"> minus </span>
      <Minus class="w-4 h-4" />
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
      class="w-12 text-center focus:outline-none rounded-none"
    />
    <button
      on:click={() => {
        if (minutes < 59) {
          minutes++;
        }
      }}
      class="h-full w-12 flex items-center justify-center"
    >
      <span class="sr-only"> minus </span>
      <Plus class="w-4 h-4" />
    </button>
  </div>
  <span class="text-2xl">:</span>
  <div
    class="flex border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-600 divide-x divide-gray-300 h-[42px]"
  >
    <button
      on:click={() => {
        if (seconds > 0) {
          seconds--;
        }
      }}
      class="h-full w-12 flex items-center justify-center"
    >
      <span class="sr-only"> minus </span>
      <Minus class="w-4 h-4" />
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
      class="w-12 text-center rounded-none focus:outline-none"
    />
    <button
      on:click={() => {
        if (seconds < 59) {
          seconds++;
        }
      }}
      class="h-full w-12 flex items-center justify-center"
    >
      <span class="sr-only"> minus </span>
      <Plus class="w-4 h-4" />
    </button>
  </div>
</div>
