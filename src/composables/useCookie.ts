import CookiePreset from "@/types/CookiePreset";

function setCookie(key: string, value: string, expire: number = -1) {
    document.cookie = `${key}=${value}; max-age=${expire}`;
}

function setCookies(cookies: { [key: string]: string }, expire: number) {
    for (const key in cookies) {
        setCookie(key, cookies[key], expire);
    }
}

function getCookie(key: string): string {
    const cookies = decodeURIComponent(document.cookie).split('; ');
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split('=');
        if (cookieKey === key) {
            return cookieValue;
        }
    }
    return '';
}

function getCookies(keys: string[]): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    for (const key of keys) {
        result[key] = getCookie(key);
    }
    return result;
}

function setPreset(preset: Partial<CookiePreset>) {
    const target = getPreset();
    for (const key in preset) {
        target[key] = preset[key];  
    }
    setCookie("preset", btoa(JSON.stringify(target)), 24 * 60 * 60);
}

function getPreset(): CookiePreset {
    const preset = getCookie("preset") 
        ? JSON.parse(atob(getCookie("preset"))) : {};
    const result = new CookiePreset();
    for (const key in result) {
        if (preset[key]) {
            result[key] = preset[key]
        }
    }
    return result;
}

function clearPreset() {
    setCookie("preset", "");
}

function hasPreset(): boolean {
    return getCookie("preset") !== "";
}

export {
    setCookie,
    setCookies,
    getCookie,
    getCookies,
    setPreset,
    getPreset,
    clearPreset,
    hasPreset
};