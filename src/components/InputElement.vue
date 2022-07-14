<template>
  <input type="text"
         ref="inputBox"
         @focus="setFocus"
         :class="['element', 'element-highlight']"
         @keydown="handleKey"
         @input="handleInput"
  >
</template>
<script lang="ts">
import useTextInput from "@/composables/useTextInput";
import {defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "InputElement",
  props: {
    index: {
      type: [Number],
      default: 0
    }
  },
  setup(props) {
    const {
      buffer,
      cursor,
      pushChar,
      popChar,
      moveCursor,
    } = useTextInput();
    const inputBox = ref<HTMLInputElement | null>(null);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (inputBox.value) {
          inputBox.value.value = "";
        }
        popChar();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveCursor(props.index - 1);
      } else if (event.key == "ArrowRight") {
        event.preventDefault();
        moveCursor(props.index + 1);
      } else if (buffer[props.index].value !== null) {
        event.preventDefault();
        if(/^[a-z0-9A-Z]$/.test(event.key)){
          moveCursor(props.index + 1);
        }
      }
    }
    const handleInput = (event: InputEvent) => {
      if (event.data) {
        if (!/^[a-z0-9A-Z]$/.test(event.data)) {
          if (inputBox.value) {
            inputBox.value.value = "";
          }
        } else {
          pushChar(event.data);
        }
      }
    };
    const setFocus = () => {
      if (inputBox.value) {
        inputBox.value.selectionStart = inputBox.value.selectionEnd = inputBox.value.value.length;
        moveCursor(props.index);
      }
    }
    watch(cursor, (newValue) => {
      if (newValue === props.index && inputBox.value) {
        inputBox.value.focus();
      }
    });
    watch(buffer[props.index], (newValue) => {
      if (inputBox.value) {
        if (newValue !== null) {
          inputBox.value.value = newValue;
        } else {
          inputBox.value.value = "";
        }
      }
    });
    return {
      highlight: false,
      cursor,
      inputBox,
      moveCursor,
      handleKey,
      handleInput,
      setFocus,
    }
  }
})
</script>
<style scoped>
.element {
  @apply mx-2 rounded border border-gray-400 w-16 h-16 text-center select-none;
  caret-color: transparent;
}

.element-highlight {
  @apply focus:border-blue-600 focus:outline-none focus:border-2;
}
</style>