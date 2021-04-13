import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'


Vue.config.productionTip = false

Vue.use(Vuex);


// state
const state = {
  posts: []
}

// getters
const getters = {
  getAllPosts: function (state) {
    return state.posts
  }
}

// actions
const actions = {
  getPostsAction({ commit }) {
    axios.post("http://localhost:3000/api", sendForm("FIRST")).then(response => {
      commit('SET_POSTS', response.data.dirs)
      console.log(response.data)
    })
  }
}

// mutations
const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

new Vue({
  store: store,
  render: (h) => h(App)
}).$mount('#app')

function sendForm(action) {
  //FIRST NEXT
  let formData = new FormData();
  formData.append("action", action);
  return formData;
}





