<template>
  <div>
    <input
      type="text"
      ref="inputBox"
      :class="['element', highlight ? 'element-highlight' : '']"
      @focus="$emit('attention', index), setSelection()"
      @keydown="handleKeyDown($event)"
      @input="handleInput($event)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputElement", 
  props: {
    highlight: {
      type: Boolean, 
      default: false,
    }, 
    index: {
      type: [Number, String],   
      default: 0    
    }
  }, 
  methods: {
    setFocus() {
      (this.$refs.inputBox as HTMLInputElement).focus()
    }, 
    setInput(val: string = "") {
      val = (val == "\0") ? "" : val;
      (this.$refs.inputBox as HTMLInputElement).value = val;
    }, 
    setSelection() {
      (this.$refs.inputBox as HTMLInputElement).select()
    }, 
    handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Backspace") {
        this.$emit("backspace", event)
      } else if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
        this.$emit("arrow", event)
      } else if (event.key == "Enter") {
        this.$emit("enter", event)
      }
    }, 
    handleInput(event: any) {
      if (event.data) {
        this.$emit("inputChar", event.target.value);
      }      
    },
  }
})
</script>
<style scoped>
.element {
  @apply rounded border border-gray-400 w-16 h-16 text-center;
}

.element-highlight {
  @apply border-blue-600 outline-none border-2;
}
</style>