import Vue from 'vue'

Vue.mixin({
    data: () => ({
        appName: process.env.appName,
        appURL: process.env.appURL
    }),
    methods: {
        sauce(path: string): string {
            return (this as any).appURL + '/' + path
        },
        rng(min = 20, max = 80, isRng = false): number | boolean {
            const brrr = (a: number) => Math.floor(Math.random() * a)

            return isRng
                ? brrr(max) > brrr(100 - max)
                : brrr(max) + min
        },
        setMetaHead(obj: any) {
            const head: any = document.head,
                title = `${obj.title} | ${(this as any).appName}`

            document.title = title
            head.querySelector('meta[name=apple-mobile-web-app-title]').content = title
            head.querySelector('meta[name="og:title"]').content = title
            head.querySelector('meta[name="description"]').content = obj.desc
            head.querySelector('meta[name="og:description"]').content = obj.desc
        }
    }
})
