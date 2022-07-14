import { ref } from "vue";

const maxLength = 8;
let buffer = new Array<number>(maxLength).fill(0).map(() => ref(null as null | string));
let cursor = ref<number>(0);
let disableInput = false;

export default () => {

    const pushChar = (char: string) => {
        if (!disableInput) {
            buffer[cursor.value].value = char;
        }
        moveCursor(cursor.value + 1);
    }

    const popChar = () => {
        if (buffer[cursor.value].value !== null) {
            buffer[cursor.value].value = null;
            disableInput = (cursor.value === maxLength - 1) ? false : disableInput;
        } else {
            moveCursor(cursor.value - 1);
        }
    }

    const moveCursor = (newPosition: number) => {
        if (newPosition >= 0 && newPosition < maxLength) {
            cursor.value = newPosition;
        }
        disableInput = (newPosition === maxLength);
    }

    return {
        buffer,
        cursor,
        pushChar,
        popChar,
        moveCursor,
    }
}
