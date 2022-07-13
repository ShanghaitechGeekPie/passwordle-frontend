function isInvalidRequest(response: Response | undefined): boolean {
    if (response == undefined) {
        return false
    }
    return 400 <= response.status && response.status < 500
}

function isBackendError(response: Response | undefined): boolean {
    if (response == undefined) {
        return false
    }
    return response.status >= 500
}

function isNetworkError(response: Response | undefined): boolean {
    if (response == undefined) {
        return true
    }
    if (response.status == 200) {
        return false
    }
    return (!isBackendError(response)) && (!isInvalidRequest(response))
}

export {
    isInvalidRequest, 
    isBackendError,
    isNetworkError
}