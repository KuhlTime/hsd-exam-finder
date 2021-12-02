import axios from 'axios'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
  plugins: [vuexLocal.plugin],
  state: {
    exams: [],
    bookmarkIds: [],
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
            response.data
              .map(e => {
                return {
                  ...e,
                  id: e.id.split('/').pop()
                }
              })
              .sort((a, b) => {
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
  getters: {
    bookmarkedExams: state => {
      return state.exams.filter(exam => {
        return state.bookmarkIds.includes(exam.id)
      })
    }
  },
  mutations: {
    setExams(state, exams) {
      state.exams = exams
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    addBookmark(state, examId) {
      state.bookmarkIds.push(examId)
    },
    removeBookmark(state, examId) {
      state.bookmarkIds = state.bookmarkIds.filter(id => id !== examId)
    },
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION
  },
  mounted() {}
})

export default store
