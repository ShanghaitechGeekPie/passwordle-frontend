<template>
  <div class="inline-grid grid-cols-6 gap-2">
    <GuessElement v-for="(letter, index) in guess.hash" :letter="letter" :state="guess.guess[index]"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {GuessResponse} from "../types/GuessDisplay";
import GuessElement from "./GuessElement.vue";

export default defineComponent({
  name: "GuessDisplay",
  components: {GuessElement},
  props: {
    guess: {
      type: Object as PropType<GuessResponse>,
      required: true,
    }
  }
})
</script>

<style scoped>

</style>