export default (from: any, to: any) => {
    const fromPrototype = Object.getPrototypeOf(from)
    const toPrototype = Object.getPrototypeOf(to)
    if (fromPrototype !== toPrototype) {
        throw new Error(`Cannot copy property '${from}' to object '${to}'`)
    }
    if (from instanceof Array) {
        to.splice(0, to.length, ...from)
    }
    else {
        for (const key in from) {
            to[key] = from[key]
        }
    }
}