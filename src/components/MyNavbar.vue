<script>
import Container from './Container.vue'

export default {
  name: 'MyNavbar',
  components: { Container },
  props: {
    version: {
      type: String,
      default: '2.0.0'
    }
  }
}
</script>

<template>
  <container width="90%" max-width="900px" class="container" center>
    <div>
      <div
        class="slide-title"
        :class="{ hidden: !showBackButton }"
        @click="$router.go(-1)"
      >
        <img src="../assets/back-icon.svg" class="back-button transition" />
        <img src="../assets/hsd-logo.svg" class="logo transition" alt="Logo" />
      </div>
      <span class="title"><b>Prüfungs</b>Planner</span>
      <p class="version-label">Version: {{ version }}</p>
    </div>
  </container>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

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
  background-color: #fff;

  /* Interactive */
  cursor: pointer;

  /* Transistion */
  transition: background-color ease-in-out 160ms, all ease-in-out 300ms;
}
.slide-title:hover .back-button {
  /* Style */
  background-color: rgba(255, 255, 255, 0.6);
}

.hidden .back-button {
  opacity: 0;
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
.version-label {
  font-size: 12px;
  margin: 0;
  margin-left: 2px;
  margin-top: 6px;
  color: hsla(0, 0%, 100%, 0.5);
  transition: all 0.16s ease-in-out;

  &:hover {
    color: hsla(0, 0%, 100%, 1);
    cursor: pointer;
  }
}
</style>
