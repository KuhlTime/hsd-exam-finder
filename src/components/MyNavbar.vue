<script>
import moment from 'moment'
import Container from './Container.vue'
import Bar from './hydrogen/Bar.vue'

export default {
  name: 'MyNavbar',
  components: { Container, Bar },
  props: {
    version: {
      type: String,
      default: '2.0.0'
    }
  },
  computed: {
    showBackButton() {
      return this.$route.meta.showBackButton
    },
    iCalLink() {
      return this.$store.getters.iCalLink
    },
    latestUpdate() {
      return moment(this.$store.getters.lastChange).format('DD.MM.YYYY')
    }
  }
}
</script>

<template>
  <container width="90%" max-width="900px" class="container" center>
    <bar>
      <template v-slot:left>
        <div>
          <div class="slide-title" :class="{ hidden: !showBackButton }" @click="$router.go(-1)">
            <img src="../assets/back-icon.svg" class="back-button transition" />
            <img src="../assets/hsd-logo.svg" class="logo transition" alt="Logo" />
          </div>
          <span class="title"><b>Prüfungs</b>Planner</span>
          <p class="small-label">
            <a class="version-label" href="https://github.com/KuhlTime/hsd-exam-finder/tree/v2" target="_blank">
              Version: {{ version }}
            </a>
            - Datenstand: {{ latestUpdate }}
          </p>
        </div>
      </template>
      <template v-slot:default>
        <!-- <input type="search" v-model="searchString" placeholder="Suche" @focus="focus()" @blur="blur()" /> -->
      </template>
      <template v-slot:right>
        <div>
          <a :href="iCalLink" target="_blank">
            <img src="@/assets/calendar.svg" class="bar-button-item" />
          </a>
        </div>
      </template>
    </bar>
  </container>
</template>

<style lang="scss" scoped>
.slide-title {
  transition: all ease-in-out 300ms;
}

.transition {
  transition: all ease-in-out 300ms;
}

.hidden {
  transform: translateX(-26px);
}

/*-------------*/
/* BACK-BUTTON */
/*-------------*/
.back-button {
  /* Position */
  padding: 2px;
  margin-right: 8px;

  /* Display */
  height: 20px;
  width: 20px;
  border-radius: 50%;

  /* Style */
  background-color: #000;

  /* Interactive */
  cursor: pointer;

  /* Transistion */
  transition: background-color ease-in-out 160ms, all ease-in-out 300ms;
}
.slide-title:hover:not(.hidden) .back-button {
  /* Style */
  opacity: 0.6;
  cursor: pointer;
}

.slide-title.hidden .back-button {
  /* Style */
  opacity: 0;
  cursor: auto;
}

/*------*/
/* LOGO */
/*------*/
.logo {
  /* Display */
  display: inline-block;
  height: 20px;

  /* Interactive */
  user-select: none;
  cursor: pointer;
}

.title {
  /* Display */
  height: 20px;
  font-size: 22px;
}

/*----------------*/
/* VERSION-LABEL */
/*----------------*/

.small-label {
  font-size: 12px;
  margin: 0;
  margin-left: 2px;
  margin-top: 6px;
  color: rgba(black, 0.5);
  transition: all 0.16s ease-in-out;
  text-decoration: none;
}

.version-label {
  color: rgba(black, 0.5);
  transition: all 0.16s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: rgba(black, 1);
  }
}

.bar-button-item {
  /* Display */
  height: 26px;
  transition: all ease-in-out 300ms;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}

input {
  padding: 8px 10px;
  border: 1px solid rgba(black, 0.4);
  border-radius: 3px;
  outline: none;

  &:focus {
    border-color: #000;
  }
}
</style>
