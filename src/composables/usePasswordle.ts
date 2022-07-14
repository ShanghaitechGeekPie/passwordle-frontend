import { reactive } from "vue";
import { fetchByGet, fetchByPost } from "@/composables/useFetching"
import { setPreset, getPreset, clearPreset } from "@/composables/useCookie"
import useRefCopy from "@/composables/useRefCopy";
import $global from "@/composables/useGlobal"
import CookiePreset from "@/types/CookiePreset";
import { isBackendError, isNetworkError } from "./useHttpError";

export default () => {

    useRefCopy(getPreset(), $global)

    const status = reactive({
        surmise: "",
        loading: false, 
        error: ""
    })

    const doCreateGame = async () => {
        status.loading = true
        status.error = "";
        try {
            const response = await fetchByPost("/create/");
            clearPreset();
            setPreset({
                id: response.data.id,            
            });
            $global.id = response.data.id
            $global.steps = 0;
            $global.result = (new CookiePreset).result;
        } catch (err: any) {
            let response = err.response
            if (isNetworkError(response)) {
                status.error = "Network error"
            } else if (isBackendError(response)) {
                status.error = "Backend error"
            } else {
                status.error = "Invalid request"
            }
        } finally {
            status.loading = false
        }
    }

    const doGetGame = async () => {        
        if (!$global.id) {
            return
        }
        status.loading = true
        $global.result = (new CookiePreset).result
        try {
            const response = await fetchByGet(`/games/${$global.id}`);
            setPreset({
                steps: response.data.guess_count
            })
            $global.steps = response.data.guess_count;
        } catch (err: any) {
            let response = err.response                
            if (isNetworkError(response)) {
                status.error = "Network error"
            } else if (isBackendError(response)) {
                status.error = "Backend error"
            } else {
                status.error = "Invalid request"
            }
        } finally {
            status.loading = false
            $global.result = getPreset().result
        }
    }

    const doMakeGuess = async () => {
        if (!$global.id) {
            return
        }
        if (!(/^[a-z0-9A-Z]{8}$/.test(status.surmise))) {
            return
        }
        status.loading = true
        try {
            const response = await fetchByPost(`/guess/${$global.id}`, {
                guess: status.surmise,
            });
            setPreset({
                result: response.data,
                steps: $global.steps + 1,
            })
            $global.result = response.data;
            console.log(getPreset())
            $global.steps += 1;
        } catch (err: any) {
            let response = err.response
            if (isNetworkError(response)) {
                status.error = "Network error"
            } else if (isBackendError(response)) {
                status.error = "Backend error"
            } else {
                status.error = "Invalid request"
            }
        } finally {
            status.loading = false
        }
    }

    return {
        status,
        doCreateGame,
        doGetGame,
        doMakeGuess
    }
}