type GuessState = "Exact" | "Close" | "Wrong";

interface GuessResponse {
    hash: string,
    guess: GuessState[],
}

export type {GuessState, GuessResponse};