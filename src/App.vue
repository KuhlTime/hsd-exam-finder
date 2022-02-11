<script>
import MyNavbar from './components/MyNavbar.vue'
import HydrogenSpinner from './components/hydrogen/HydrogenSpinner.vue'
import Center from './components/hydrogen/Center.vue'

export default {
  name: 'App',
  components: {
    MyNavbar,
    HydrogenSpinner,
    Center
  },
  computed: {
    exams() {
      return this.$store.state.exams
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  mounted() {
    this.$store.dispatch('fetchExams')
  },
  created() {
    // const params = new URLSearchParams(document.location.search)
    // console.log(params.get('q'))
    // this.$store.commit('setSearchString', params.get('q'))
    // this.$store.commit('showSearch', false)
  }
}
</script>

<template>
  <my-navbar />
  <transition class="spinner-container" name="fade" mode="out-in">
    <center v-if="isLoading">
      <hydrogen-spinner />
    </center>
  </transition>
  <div id="content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component v-if="!isLoading" :is="Component" />
      </transition>
    </router-view>
  </div>
  <footer>
    <b style="font-size: 11px">
      Developed by
      <a style="color: #2d8eff" href="https://kuhlti.me" target="_blank">André Kuhlmann</a>
    </b>
    <br />
  </footer>
</template>

<style>
html,
body {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  /* background: linear-gradient(180deg,#232d42,#0b1324); */
  padding: 42px;
}

/* Page Transistion */
/* https://learnvue.co/2021/01/4-awesome-examples-of-vue-router-transitions/ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#content {
  height: calc(100% - 64px);
  display: flex;
  position: relative;
  margin-top: 24px;
}

footer {
  text-align: center;
  font-size: 9px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
