import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    nav: {},
    foot: {},
    keys: [],
    social: [],
    welcome: {}
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    nav: s => s.nav,
    foot: s => s.foot,
    social: s => s.social,
    keys: s => s.keys,
    welcome: s => s.welcome
}

export const actions: ActionTree<RootState, RootState> = {
    async getApp({ commit }) {
        const app = localStorage.getItem('app')
        let nav: any,
            foot: any,
            social: any,
            keys: any,
            bool: boolean = false

        if (app) {
            const json = JSON.parse(atob(app))

            nav = json.nav
            foot = json.foot
            social = json.social
            keys = json.keys
            bool = true
        } else {
            const _this = (this as any)

            nav = await _this.$axios.get("/navbar")
            foot = await _this.$axios.get("/footer")
            social = await _this.$axios.get("/social")
            keys = await _this.$axios.get("/keyword")

            localStorage.setItem('app', btoa(JSON.stringify({
                nav: nav.data,
                foot: foot.data,
                social: social.data,
                keys: keys.data
            })))
        }

        commit('SET_NAV', bool ? nav : nav.data)
        commit('SET_FOOT', bool ? foot : foot.data)
        commit('SET_SOCIAL', bool ? social : social.data)
        commit('SET_KEYS', bool ? keys : keys.data)
    },
    async setWelcome({ commit, getters }) {
        const { welcome } = getters
        let data: any,
            bool: boolean = false

        if (Object.keys(welcome).length) {
            data = welcome
            bool = true
        } else
            data = await (this as any).$axios.get('/welcome')

        commit('SET_WELCOME', bool ? data : data.data)
    }
}

export const mutations: MutationTree<RootState> = {
    SET_NAV: (state, data: object) => state.nav = data,
    SET_FOOT: (state, data: object) => state.foot = data,
    SET_SOCIAL: (state, data) => state.social = data,
    SET_KEYS: (state, data) => state.keys = data,
    SET_WELCOME: (state, data: object) => state.welcome = data
}
