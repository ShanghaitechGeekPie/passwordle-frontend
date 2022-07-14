<template>
  <button :class="'element '+(shiftPressed?'uppercase':'lowercase')">
    <slot/>
  </button>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'SimpleKey',
  props: {
    shiftPressed: {
      required: true,
      type: Boolean,
    }
  },

})
</script>

<style scoped>
.element {
  @apply w-8 h-12 rounded font-bold mx-1 text-xl flex items-center justify-center bg-gray-200 active:bg-gray-500 active:text-white;
}
</style>