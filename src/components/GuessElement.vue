<template>
  <div :class="'element ' + state">
    <div>
      {{ letter }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GuessState } from "@/types/GuessDisplay";

export default defineComponent({
  name: "GuessElement",
  props: {
    letter: {
      type: String,
      required: true,
    },
    state: {
      type: String as PropType<GuessState>,
      required: true,
    },
  },
});
</script>

<style scoped>
.element {
  @apply w-20 h-20 text-white font-bold text-center text-4xl flex items-center justify-center;
}

.Exact {
  @apply bg-[#538d4e];
}

.Close {
  @apply bg-[#b59f3b];
}

.Wrong {
  @apply bg-[#787c7e];
}

.None {
  @apply bg-white border-2 border-gray-400
}
</style>