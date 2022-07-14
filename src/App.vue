<script setup lang="ts">
import GuessDisplay from "@/components/GuessDisplay.vue";
import Keyboard from "@/components/Keyboard.vue";
import usePasswordle from "@/composables/usePasswordle";
import $global from "@/composables/useGlobal"

const { status, doCreateGame, doGetGame, doMakeGuess } = usePasswordle();
doGetGame()

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
          <input type="text" v-model="status.surmise" />
          <button @click="doMakeGuess()">Confirm</button>
          <br>
          <button @click="doCreateGame()">Start</button>
          <div>
            {{ $global.steps }} / 64
          </div>
          <div v-if="status.loading">
            loading...
          </div>
          <div>{{ status.error }}</div>
        </div>
        <div class="py-8">
          <div class="text-4xl">!!!NOTICE AREA!!!</div>
        </div>
        <div>
          <GuessDisplay :guess="$global.result" />
        </div>
        <div>
          <Keyboard/>
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