import { ref } from "vue";

const maxLength = 8;
let buffer = new Array<number>(maxLength).fill(0).map(() => ref(null as null | string));
let cursor = ref<number>(0);
const safeCursorValue = -1;
let disableInput = false;

export default () => {

    const moveCursor = (newPosition: number) => {
        if (newPosition >= 0 && newPosition < maxLength) {
            cursor.value = newPosition;
        }
        disableInput = (newPosition === maxLength);
    }
    
    const moveCursorWithFocus = (newPosition: number) => {
        const oldPosition = cursor.value;
        cursor.value = safeCursorValue;
        moveCursor(newPosition)
        if (cursor.value == safeCursorValue) {
            cursor.value = oldPosition;
        }
    }

    const pushChar = (char: string) => {
        if ((!disableInput) && (!buffer[cursor.value].value)) {
            buffer[cursor.value].value = char;
            moveCursorWithFocus(cursor.value + 1);
        } else if (cursor.value < maxLength - 1) {
            moveCursorWithFocus(cursor.value + 1);
        } else {
            moveCursor(cursor.value + 1);
        }
    }

    const popChar = () => {
        if (buffer[cursor.value].value !== null) {
            buffer[cursor.value].value = null;
            if (cursor.value === maxLength - 1) {
                disableInput = false
            }
            moveCursorWithFocus(cursor.value);
        } else {
            moveCursor(cursor.value - 1);
        }
    }

    const clear = ()=>{
        for(let buf of buffer){
            buf.value = null;
        }
        moveCursor(0);
    }

    return {
        buffer,
        cursor,
        pushChar,
        popChar,
        moveCursor,
        clear,
    }
}
