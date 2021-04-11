import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')



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
    axios.post("http://localhost:3000/api", { action: "FIRST" }).then(response => {
      commit('SET_POSTS', response.data)
    })
  }
}

// mutations
const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  }
}



