export default function (to, from, savedPosition) {
    return to.hash
        ? { selector: to.hash }
        : savedPosition || { x: 0, y: 0 }
}
