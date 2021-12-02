import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    exams: [],
    isLoading: true
  },
  actions: {
    fetchExams({ commit }) {
      commit('setLoading', true)
      axios
        .get('https://hsd-api.herokuapp.com/v1/exams')
        .then(response => {
          commit(
            'setExams',
            response.data.sort((a, b) => {
              if (a.degree === b.degree) {
                if (a.semester === b.semester) {
                  return a.code > b.code ? 1 : -1
                }

                return a.semester > b.semester ? 1 : -1
              }

              return a.degree > b.degree ? 1 : -1
            })
          )
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  mutations: {
    setExams(state, exams) {
      state.exams = exams
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    }
  }
})

export default store
