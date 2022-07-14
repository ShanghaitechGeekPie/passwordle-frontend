import { reactive } from "vue";
import { fetchByGet, fetchByPost } from "@/composables/useFetching"
import { setPreset, getPreset, clearPreset } from "@/composables/useCookie"
import useRefCopy from "@/composables/useRefCopy";
import $global from "@/composables/useGlobal"
import CookiePreset from "@/types/CookiePreset";
import { isBackendError, isNetworkError } from "@/composables/useHttpError";

export default () => {

    $global.id = getPreset().id;

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
            useRefCopy(new CookiePreset(), $global)
            $global.id = response.data.id
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
        status.loading = true;
        status.error = "";
        try {
            const response = await fetchByGet(`/games/${$global.id}`);
            setPreset({
                steps: response.data.guess_count
            })
            useRefCopy(getPreset(), $global)
            $global.steps = response.data.guess_count;
        } catch (err: any) {
            let response = err.response                
            if (isNetworkError(response)) {
                status.error = "Network error"
            } else if (isBackendError(response)) {
                status.error = "Backend error"
            } else {
                if (response.status === 404) {
                    clearPreset()
                    useRefCopy(new CookiePreset(), $global)
                    status.error = "Overtime game id"
                } else {
                    status.error = "Invalid request"
                }                
            }
        } finally {
            status.loading = false
        }
    }

    const doMakeGuess = async () => {
        if (!$global.id) {
            return
        }
        if (!(/^[a-z0-9A-Z]{8}$/.test(status.surmise))) {
            return
        }
        if ($global.steps === 64) {
            clearPreset()
            useRefCopy(new CookiePreset(), $global)
            status.error = "Reach maxium steps";
            return   
        }
        status.loading = true
        status.error = "";
        try {
            const response = await fetchByPost(`/guess/${$global.id}`, {
                guess: status.surmise,
            });
            setPreset({
                result: response.data,
                steps: $global.steps + 1,
            })
            $global.result = response.data;
            $global.steps += 1;
        } catch (err: any) {
            let response = err.response
            if (isNetworkError(response)) {
                status.error = "Network error"
            } else if (isBackendError(response)) {
                status.error = "Backend error"
            } else {
                if (response.status === 404) {
                    clearPreset()
                    useRefCopy(new CookiePreset(), $global)
                    status.error = "Overtime game id"
                } else {
                    status.error = "Invalid request"
                }   
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