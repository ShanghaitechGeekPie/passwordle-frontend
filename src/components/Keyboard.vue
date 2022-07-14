<template>
  <div class="flex flex-col items-center select-none">
    <div class="row">
      <SimpleKey :shiftPressed="shiftPressed" v-for="letter in '1234567890'">{{ letter }}</SimpleKey>
    </div>
    <div class="row">
      <SimpleKey :shiftPressed="shiftPressed" v-for="letter in 'qwertyuiop'">{{ letter }}</SimpleKey>
    </div>
    <div class="row">
      <SimpleKey :shiftPressed="shiftPressed" v-for="letter in 'asdfghjkl'">{{ letter }}</SimpleKey>
      <SimpleKey :shiftPressed="shiftPressed">
        <font-awesome-icon icon="fa-solid fa-delete-left"/>
      </SimpleKey>
    </div>
    <div class="row">
      <button :class="'key '+(shiftPressed?'press':'release')">
        <font-awesome-icon icon="fa-solid fa-angle-up" @click="onClickShift"/>
      </button>
      <SimpleKey :shiftPressed="shiftPressed" v-for="letter in 'zxcvbnm'">{{ letter }}</SimpleKey>
      <button :class="'enter active:bg-gray-500 active:text-white'">
        enter
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import SimpleKey from "@/components/SimpleKey.vue"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faChessQueen} from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  name: "Keyboard",
  components: {SimpleKey, FontAwesomeIcon, faChessQueen},
  setup() {
    const shiftPressed = ref(false);
    const onClickShift = (e: Event) => {
      e.stopPropagation();
      shiftPressed.value = !shiftPressed.value;
    }
    return {shiftPressed, onClickShift};
  }
})
</script>

<style scoped>
.row {
  @apply flex my-1;
}

.key {
  @apply w-8 h-12 rounded font-bold mx-1 text-xl flex items-center justify-center bg-gray-200;
}

.enter {
  @apply w-[4.5rem] h-12 rounded font-bold mx-1 text-xl flex items-center justify-center bg-gray-200;
}

.release {
  @apply bg-gray-200;
}

.press {
  @apply bg-gray-500 text-white;
}
</style>