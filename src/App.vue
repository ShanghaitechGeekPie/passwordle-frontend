<script setup lang="ts">
import GuessDisplay from "@/components/GuessDisplay.vue";
import InputDisplay from "@/components/InputDisplay.vue";
import Divider from "@/components/Divider.vue";
import Keyboard from "@/components/Keyboard.vue";
import usePasswordle from "@/composables/usePasswordle";
import $global from "@/composables/useGlobal";

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
      <InputDisplay length="8" v-model="status.surmise" />
    </div>
    <div class="py-8 flex-center">
      <Keyboard/>
    </div>
  </div>
</template>

<style scoped>
.flex-center {
  @apply flex justify-center;
}
</style>