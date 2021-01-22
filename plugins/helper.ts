import Vue from 'vue'

Vue.mixin({
    data: () => ({
        appName: process.env.appName,
        appURL: process.env.appURL
    }),
    methods: {
        sauce(path: string): string {
            return process.env.appURL + '/' + path
        },
        storage(key: string, replace: boolean, value: object | null): object | boolean | null {
            const data = localStorage.getItem(key),
                set = () => localStorage.setItem(key, btoa(JSON.stringify(value)))

            if (data) {
                if (replace) {
                    set()

                    return true
                }
                return JSON.parse(atob(data))
            } else {
                if (value) {
                    set()

                    return true
                }
            }

            return null
        }
    }
})
