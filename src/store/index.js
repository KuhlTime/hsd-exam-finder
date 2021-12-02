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
    isLoading: true,
    search: '',
    showSearch: false
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
    },
    iCalLink: state => {
      return 'webcal://hsd-api.herokuapp.com/v1/ical/' + state.bookmarkIds.join(',')
    },
    lastChange: state => {
      const a = state.exams.sort((a, b) => {
        return a > b
      })[0].updated

      return a
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
    // setSearchString(state, search) {
    //   const url = new URL(window.location.href)

    //   if (search === '') {
    //     url.searchParams.delete('q')
    //   } else {
    //     url.searchParams.set('q', search)
    //   }

    //   window.history.replaceState(null, null, url)

    //   state.search = (search || '').trim()
    // },
    // showSearch(state, show) {
    //   state.showSearch = show
    // },
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION
  }
})

export default store
