<script setup lang="ts">
import Keyboard from "@/components/Keyboard.vue";
import usePasswordle from "@/composables/usePasswordle";
import GuessDisplay from "@/components/GuessDisplay.vue";
import $global from "@/composables/useGlobal";
import InputElement from "@/components/InputElement.vue";

const {status, doCreateGame, doGetGame, doMakeGuess} = usePasswordle();
doGetGame();
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="border-b w-full flex justify-center border-gray-300 py-1 md:py-2">
      <h1 class="text-3xl md:text-4xl font-bold font-mono">Passwordle</h1>
    </div>
    <div class="flex flex-col items-center justify-center gap-[1vh] md:gap-[2vh] flex-grow text-lg md:text-xl">
      <div>
        <GuessDisplay :guess="$global.result"/>
      </div>
      <div class="">
        <div v-if="!$global.id">
          <button class="button-start button-start-hover" @click="doCreateGame()">
            Start
          </button>
        </div>
        <div class="h-10 flex-center flex-col message" v-else>
          <div>{{ $global.steps }}/64</div>
        </div>
      </div>
      <div class="select-none flex flex-col md:flex-row items-center font-mono">
        <div class="md:contents">
          <span>md5('</span>
          <InputElement
              v-for="i in new Array(8).fill(0).map((_, j) => j)"
              :index="i"
              :key="i"
              :filter="(str: string) => /^[a-z0-9A-Z]$/.test(str)"
              @finish="(status.surmise = $event), doMakeGuess()"
          /><span>'&nbsp;</span>
        </div>
        <div class="md:contents">
          <span>+ '{{ $global.salt }}')</span>
        </div>
      </div>
      <div>
        <div class="h-8 message" v-if="status.loading">loading...</div>
        <div class="h-8 message" v-else-if="!status.error">
          {{ status.error }}
        </div>
        <div class="h-8" v-else></div>
      </div>
      <Keyboard/>
    </div>
  </div>
</template>

<style scoped>
.flex-center {
  @apply flex justify-center;
}

.button-start {
  @apply border-2 w-20 h-10 rounded border-gray-400 text-gray-400 font-bold font-mono;
}

.button-start-hover {
  @apply hover:border-green-600 hover:text-green-600;
}

.message {
  @apply text-gray-400 font-bold font-mono;
}
</style>