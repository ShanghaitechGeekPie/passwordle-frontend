import { watch, WatchCallback } from "vue"

export default (variable: any, callback: WatchCallback<any, any>) => {
    watch(variable, callback, { deep: true, immediate: true })
}