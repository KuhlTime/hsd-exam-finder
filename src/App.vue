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
  height: calc(100% - 42px);
  display: flex;
  position: relative;
}
</style>
