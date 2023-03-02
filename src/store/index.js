import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tab from './tab'

export default new Vuex.Store({
    modules:{
        tab,
    }
})