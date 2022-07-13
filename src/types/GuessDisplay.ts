type GuessState = "Exact" | "Close" | "Wrong" | "None";

interface GuessResponse {
    hash: string,
    guess: GuessState[],
}

export type { GuessState, GuessResponse };