function isInvalidRequest(response: Response): boolean {
    return response && /^40\d+$/.test(response.status.toString());
}

function isBackendError(response: Response): boolean {
    return response && /^50\d+$/.test(response.status.toString());
}

function isNetworkError(response: Response): boolean {
    return (!response) ||
        ((!isBackendError(response))
            && (!isInvalidRequest(response))
            && response.status != 200)
}

export {
    isInvalidRequest, 
    isBackendError,
    isNetworkError
}