import axios, { AxiosRequestConfig } from "axios"
import Config from "@/Config"

async function fetchByGet(url: string, config?: AxiosRequestConfig) {
    return await axios.get(Config.server + url, config)
}

async function fetchByPost(url: string, data?: any, config?: AxiosRequestConfig) {
    return await axios.post(Config.server + url, data, config)
}

export {
    fetchByGet, 
    fetchByPost
}