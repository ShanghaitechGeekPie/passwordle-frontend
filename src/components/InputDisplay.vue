<template>
  <div
    class="flex"
    @focusin="isHighlighted = true"
    @focusout="isHighlighted = false"
  >
    <div v-for="index in Number(length)" :key="index">
      <div class="px-2">
        <InputElement :highlight="isHighlighted" :index="index"
          ref="inputElements"
          @attention="currentFocus = $event"
          @backspace="handleBackspace($event)"
          @arrow="handleArrow($event)"
          @inputChar="handleInputChar($event)"
        />
        {{currentFocus}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import InputElement from "@/components/InputElement.vue";

export default defineComponent({
  name: "InputDisplay",
  data: () => ({
    isHighlighted: false,
    currentFocus: -1,
    buffer: new Array(), 
  }),
  props: {
    length: {
      type: [Number, String],
      default: 0,
    },    
    modelValue: {
      type: String,
      default: "",
    },
  },
  components: {
    InputElement,
  }, 
  mounted() {
    if (this.length < this.modelValue.length) {
      throw new Error("InputDisplay length is less than modelValue length");
    } else {
      for (let i = 0; i < this.length; i++) {
        if (i < this.modelValue.length) {
          this.buffer[i] = this.modelValue[i];
        } else {
          this.buffer[i] = "\0";
        }
      }
      setTimeout(() => {
        let elements = this.$refs.inputElements as Array<any>;
        for (let element of elements) {
          (element as any).setInput(this.buffer[(element as any).index - 1]);
        }
      }, 50)
    }
  }, 
  methods: {
    handleBackspace(event: KeyboardEvent) {
      if (this.currentFocus > 1) {
        let elements = this.$refs.inputElements as Array<any>;   
        if (this.buffer[this.currentFocus - 1] != "\0") {
          elements[this.currentFocus - 1].setInput();
          this.buffer[this.currentFocus - 1] = "\0";
        } else {
          this.currentFocus--;
          elements[this.currentFocus - 1].setFocus() 
          this.buffer[this.currentFocus - 1] = "\0";
        }         
      }
    }, 
    handleArrow(event: KeyboardEvent) {
      let elements = this.$refs.inputElements as Array<any>;
      if (event.key == "ArrowRight") {
        this.currentFocus < this.length ? this.currentFocus++ : null;
        elements[this.currentFocus - 1].setFocus();
      } else if (event.key == "ArrowLeft") {
        this.currentFocus > 1 ? this.currentFocus-- : null;
        elements[this.currentFocus - 1].setFocus();
      }
    }, 
    handleInputChar(str: string) {
      if (this.currentFocus <= this.length) {
        let elements = this.$refs.inputElements as Array<any>;
        if (this.buffer[this.currentFocus - 1] == "\0") {
          this.buffer[this.currentFocus - 1] = str;
          this.currentFocus < this.length ? this.currentFocus++ : null;          
          elements[this.currentFocus - 1].setFocus()
        } else {
          elements[this.currentFocus - 1].setInput(this.buffer[this.currentFocus - 1]);
          if (this.currentFocus < this.length) {
            this.currentFocus++;            
            this.buffer[this.currentFocus - 1] = str[1];
            elements[this.currentFocus - 1].setInput(this.buffer[this.currentFocus - 1]);
            elements[this.currentFocus - 1].setFocus()
          }          
        }
      }
    }, 
    onChange(event: any) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>