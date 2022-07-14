<template>
  <div class="flex flex-col items-center select-none">
    <div class="row">
      <SimpleKey
        :shiftPressed="shiftPressed"
        v-for="letter in '1234567890'"
        :letter="letter"
      />
    </div>
    <div class="row">
      <SimpleKey
        :shiftPressed="shiftPressed"
        v-for="letter in 'qwertyuiop'"
        :letter="letter"
      />
    </div>
    <div class="row">
      <SimpleKey
        :shiftPressed="shiftPressed"
        v-for="letter in 'asdfghjkl'"
        :letter="letter"
      />
      <button class="key active:bg-gray-500 active:text-white" @click="popChar">
        <font-awesome-icon icon="fa-solid fa-delete-left" />
      </button>
    </div>
    <div class="row">
      <button :class="['key', shiftPressed ? 'press' : 'release']">
        <font-awesome-icon icon="fa-solid fa-angle-up" @click="onClickShift" />
      </button>
      <SimpleKey
        :shiftPressed="shiftPressed"
        v-for="letter in 'zxcvbnm'"
        :letter="letter"
      />
      <button
        class="enter active:bg-gray-500 active:text-white"
        @click='onClickEnter'
      >
        enter
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SimpleKey from "@/components/SimpleKey.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";
import useTextInput from "@/composables/useTextInput";
import usePasswordle from "@/composables/usePasswordle";

export default defineComponent({
  name: "Keyboard",
  components: { SimpleKey, FontAwesomeIcon, faChessQueen },
  setup() {
    const { popChar, buffer } = useTextInput();
    const { status, doMakeGuess } = usePasswordle();
    const shiftPressed = ref(false);
    const onClickShift = (e: Event) => {
      e.stopPropagation();
      shiftPressed.value = !shiftPressed.value;
    };
    const onClickEnter = (e: Event) => {
      status.surmise = buffer.map((c) => c.value ? c.value : " ").join("")
      doMakeGuess()
    };
    return { shiftPressed, onClickShift, onClickEnter, popChar };
  },
});
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