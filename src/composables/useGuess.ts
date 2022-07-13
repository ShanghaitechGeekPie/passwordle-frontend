import {
    fetchByGet,
    fetchByPost,
} from "@/composables/useFetching"
import {
    getPreset,
    setPreset,
    hasPreset,
} from "@/composables/useCookie"
import { inject } from "vue";
import CookiePreset from "@/types/CookiePreset";
import useRefCopy from "@/composables/useRefCopy";

export default (preset: CookiePreset, guess: object) => {

    console.log((preset as CookiePreset).id)

    const doCreateGame = async () => {
        try {
            const response = await fetchByPost("/create");
            setPreset({
                id: response.data.id,
            });
            (preset as CookiePreset).id = response.data.id
        } catch (err) {
            console.log(err);
        }
    }

    const doGetGame = async () => {
        if (!(preset as CookiePreset).id) {
            return
        }
        try {
            const response = await fetchByGet(`/games/${(preset as CookiePreset).id}`);
            console.log(response)
        } catch (err) {
            console.log(err);
        }
    }

    const doTakeAction = async (action: string) => {
        console.log(action)
        if (!(preset as CookiePreset).id) {
            return
        }
        if (!(/^[a-z0-9A-Z]{8}$/.test(action))) {
            return
        }
        try {
            const response = await fetchByPost(`/guess/${(preset as CookiePreset).id}`, {
                guess: action
            });
            useRefCopy(response.data, guess);
        } catch (err) {
            console.log(err)
        }
    }


    return {
        doCreateGame,
        doGetGame, 
        doTakeAction
    }
}