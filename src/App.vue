<script setup lang="ts">
import Divider from "@/components/Divider.vue";
import Keyboard from "@/components/Keyboard.vue";
import usePasswordle from "@/composables/usePasswordle";
import GuessDisplay from "@/components/GuessDisplay.vue";
import $global from "@/composables/useGlobal";
import InputElement from "@/components/InputElement.vue";

const { status, doCreateGame, doGetGame, doMakeGuess } = usePasswordle();
doGetGame();
</script>

<template>
  <div>
    <header>
      <div class="px-4 py-2 flex-center">
        <h1 class="text-4xl font-bold font-mono">Passwordle</h1>
      </div>
    </header>
    <Divider />
    <div class="flex-center pt-48">
      <GuessDisplay :guess="$global.result" />
    </div>
    <div class="py-8 flex-center">
      <div>{{ $global.steps }} / 64</div>
      <div v-if="status.loading">loading...</div>
      <div>{{ status.error }}</div>
    </div>
    <div class="py-8 flex-center">
      <button @click="doMakeGuess()">Confirm</button>
      <br />
      <button @click="doCreateGame()">Start</button>
    </div>
    <div class="py-8 flex-center">
      <InputElement
        v-for="i in new Array(8).fill(0).map((_, j) => j)"
        :index="i"
        :key="i"
        :filter="(str: string) => /^[a-z0-9A-Z]$/.test(str)"
      />
    </div>
    <div class="py-8 flex-center">
      <Keyboard />
    </div>
  </div>
</template>

<style scoped>
.flex-center {
  @apply flex justify-center;
}
</style>