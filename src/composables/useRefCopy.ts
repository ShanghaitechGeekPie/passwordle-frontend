export default (from: any, to: any) => {
    if (from instanceof Array) {
        to.splice(0, to.length, ...from)
    }
    else {
        for (const key in from) {
            to[key] = from[key]
        }
    }
}