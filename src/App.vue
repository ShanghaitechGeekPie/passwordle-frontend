<script setup lang="ts">
import GuessDisplay from "@/components/GuessDisplay.vue";
import { reactive } from "@vue/reactivity";
import { getPreset } from "@/composables/useCookie";
import { provide } from "@vue/runtime-core";
import useGuess from "@/composables/useGuess";
import CookiePreset from "./types/CookiePreset";

const guess = reactive({
  hash: (() => {
    let res = "";
    for (let i = 0; i < 24; i++) {
      res += " ";
    }
    return res;
  })(), 
  guess: (() => {
    let res = [];
    for (let i = 0; i < 24; i++) {
      res.push("None");
    }
    return res;
  })(), 
});

const preset = reactive(getPreset());

provide("preset", preset);
provide("guess", guess);

const status = reactive({
  action: ""
})

const { doCreateGame, doGetGame, doTakeAction } = useGuess(preset, guess);

</script>

<template>
  <div class="d-divider-y">
    <header>
      <div class="px-4 py-2 d-flex-center">
        <h1 class="text-4xl font-bold font-mono">Passwordle</h1>
      </div>
    </header>
    <div class="d-flex-center">
      <div>
        <div class="py-8">
          <div class="text-4xl">!!!INPUT AREA!!!</div>
          <input type="text" v-model="status.action" />
          <button @click="doTakeAction(status.action)">Confirm</button>
          <br>
          <button @click="doCreateGame()">Start</button>
        </div>
        <div class="py-8">
          <div class="text-4xl">!!!NOTICE AREA!!!</div>
        </div>
        <div>
          <GuessDisplay :guess="guess" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-divider-y {
  @apply divide-solid divide-y;
}

.d-flex-center {
  @apply flex justify-center;
}
</style>