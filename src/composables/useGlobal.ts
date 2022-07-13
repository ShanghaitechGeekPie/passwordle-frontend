import { reactive } from "vue"
import CookiePreset from "@/types/CookiePreset"

export default reactive({
    ...new CookiePreset(),
})