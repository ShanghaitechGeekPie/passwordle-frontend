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
    <div class="flex-center pt-16">
      <GuessDisplay :guess="$global.result" />
    </div>
    <div class="pt-8 flex-center">
      <div v-if="!$global.id">
        <button class="button-start button-start-hover" @click="doCreateGame()">
          Start
        </button>
      </div>
      <div class="h-10 flex-center flex-col message" v-else>
        <div>{{ $global.steps }}/64</div>
      </div>
    </div>
    <div class="pt-8 pb-4 flex-center">
      <InputElement
        v-for="i in new Array(8).fill(0).map((_, j) => j)"
        :index="i"
        :key="i"
        :filter="(str: string) => /^[a-z0-9A-Z]$/.test(str)"
        @finish="(status.surmise = $event), doMakeGuess()"
      />
    </div>
    <div class="py-4 flex-center">
      <div class="h-8 message" v-if="status.loading">loading...</div>
      <div class="h-8 message" v-else-if="!status.error">
        {{ status.error }}
      </div>
      <div class="h-8" v-else></div>
    </div>
    <div class="py-4 flex-center">
      <Keyboard />
    </div>
  </div>
</template>

<style scoped>
.flex-center {
  @apply flex justify-center;
}

.button-start {
  @apply border-2 w-20 h-10 rounded border-gray-400 text-gray-400 font-bold font-mono text-lg;
}

.button-start-hover {
  @apply hover:border-green-600 hover:text-green-600;
}

.message {
  @apply text-gray-400 font-bold font-mono text-lg;
}
</style>