import { GuessResponse } from "./GuessDisplay";

export default class CookiePreset {
    id: string = "";
    result: GuessResponse = {
        hash: " ".repeat(24),
        guess: new Array(24).fill("None"),
    };
    steps: number = 0;
    [key: string]: any
}