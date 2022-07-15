<template>
  <button :class="['element', shiftPressed?'uppercase':'lowercase']" @click="onClick">
    {{letter}}
  </button>
</template>

<script>
import {defineComponent} from "vue";
import useTextInput from "@/composables/useTextInput";

export default defineComponent({
  name: 'SimpleKey',
  props: {
    shiftPressed: {
      required: true,
      type: Boolean,
    },
    letter: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const {pushChar} = useTextInput();
    const onClick = () => {
      pushChar(props.shiftPressed ? props.letter.toUpperCase() : props.letter.toString())
    }
    return {
      onClick,
    }
  }
})
</script>

<style scoped>
.element {
  @apply w-7 md:w-9 h-12 md:h-14 rounded font-bold mx-1 text-xl flex items-center justify-center bg-gray-200 active:bg-gray-500 active:text-white;
}
</style>