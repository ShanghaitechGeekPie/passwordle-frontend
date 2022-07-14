<template>
  <div>  
    <input type="text"
      ref="inputBox"
      @focus="$emit('attention', index)"
      :class="['element', highlight ? 'element-highlight' : '']"
      @keydown="handleKeyDown($event), handleArrow($event)"
      @input="handleInput($event)"
    >
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
      (this.$refs.inputBox as HTMLElement).focus();
    }, 
    setInput(val: string = "") {
      val = (val == "\0") ? "" : val;
      (this.$refs.inputBox as HTMLInputElement).value = val;
    }, 
    handleKeyDown(event: KeyboardEvent) {
      if (event.key == "Backspace") {
        this.$emit("backspace", event)
      }
    }, 
    handleArrow(event: KeyboardEvent) {
      if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
        this.$emit("arrow", event)
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
  @apply rounded border border-gray-400 w-16 h-16 text-center
}

.element-highlight {
  @apply border-blue-600 outline-none border-2
}
</style>