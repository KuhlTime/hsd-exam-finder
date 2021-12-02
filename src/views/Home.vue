<script>
import moment from 'moment'
import Container from '@/components/Container.vue'
import DataGrid from '@/components/DataGrid.vue'

function addZero(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

export default {
  name: 'App',
  components: {
    Container,
    DataGrid
  },
  data() {
    return {
      headers: [
        'ID',
        'Name',
        'Abschluss',
        'PO',
        'Datum',
        'Start',
        'Dauer',
        'Prüfer'
      ]
    }
  },
  computed: {
    rows() {
      return this.$store.state.exams.map(exam => {
        let timestamp = '-'
        let start = '-'
        let duration = '-'

        if (exam.timestamp) {
          timestamp = moment(exam.timestamp).format('DD.MM.YYYY')
          start = moment(exam.timestamp).format('HH:mm')
        }

        const examiners = exam.examiners.join(', ')

        if (exam.duration) {
          // duration in HH:MM
          const h = Math.floor(exam.duration / 60)
          const m = exam.duration % 60
          duration = `${addZero(h)}:${addZero(m)}`
        }

        return [
          exam.code,
          exam.name,
          exam.degree,
          exam.regulations,
          timestamp,
          start,
          duration,
          examiners
        ]
      })
    }
  }
}
</script>

<template>
  <container width="90%" max-width="900px" center class="content">
    <data-grid :headers="headers" :rows="rows" />
  </container>
</template>

<style scoped>
.content {
  margin-top: 24px;
  height: calc(100% - 60px);
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
</style>
