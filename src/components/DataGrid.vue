<template>
  <div class="my-table no-scrollbar" ref="table">
    <table>
      <thead :class="{ shadow: scrolled }">
        <tr>
          <th style="text-align: center">
            <BookmarkIcon size="1.2x" style="margin-top: 3px" />
          </th>
          <th
            v-for="(h, i) of headers"
            :key="h"
            @click="changeOrder(i)"
            :class="{ 'sort-key': i === sortKey }"
          >
            {{ h }}
            <div class="icon-placeholder" v-if="sortKey !== i" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r">
          <td>
            <input type="checkbox" />
          </td>
          <td v-for="(h, i) in headers" :key="h">{{ r[i] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BookmarkIcon } from '@zhuowenli/vue-feather-icons'

export default {
  name: 'data-grid',
  components: {
    BookmarkIcon
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      scrollY: 0,
      sortKey: 0,
      ascending: true // ascending = 1 -> 100 - descending = 100 -> 1
    }
  },
  methods: {
    changeOrder(index) {
      console.warn('Not implemented')
      return

      if (this.sortKey == index) {
        this.ascending = !this.ascending
      } else {
        this.sortKey = index
        this.ascending = true
      }
    }
  },
  computed: {
    scrolled() {
      return this.scrollY !== 0
    }
    // sortedRows() {
    //   const i = this.sortKey

    //   return [...this.rows].sort((a, b) => {
    //     return this.ascending ? a[i] > b[i] : a[i] < b[i]
    //   })
    // }
  },
  mounted() {
    const $table = this.$refs.table

    $table.addEventListener('scroll', () => {
      this.scrollY = $table.scrollTop
    })
  }
}
</script>

<style lang="scss" scoped>
.no-scrollbar {
  overflow: auto;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
}

.my-table {
  height: 100%;
  width: 100%;
  overscroll-behavior: none;
}

table {
  position: relative;
  border-collapse: collapse;

  /* Text */
  font-family: 'Roboto', 'Avenir', sans-serif;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
}

thead {
  color: hsla(0, 0%, 100%, 0.9);
  border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
}

/* Table Head */
th {
  position: sticky;
  top: 0;
  background-color: #2d8eff;
  white-space: nowrap;

  padding: 13px 12px;
  cursor: pointer;
  user-select: none;
  color: rgba(255, 255, 255, 0.7);
  transition: all ease-in-out 160ms;
  font-weight: 500;

  &.sort-key {
    color: #fff;
    font-weight: 600;
  }
}

tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

tr:nth-child(2n) {
  background-color: #f5f5f5;
}

td {
  padding: 10px 14px;
}

/* https://stackoverflow.com/a/51312747/4179020 */
table tr td:last-of-type {
  width: 100%;
}
table tr th:last-of-type {
  width: 100%;
}

/* Table Row */
tr {
  transition: all ease-in-out 120ms;

  /* Highlight table row on hover */
  &:hover {
    background-color: rgba(0, 0, 0, 0.08) !important;
  }
}

.sort-icon {
  width: 12px;
  height: 12px;
  transition: all ease-in-out 300ms;
  transform: rotate(360deg);
}
.icon-placeholder {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.up {
  transform: rotate(180deg);
}
</style>
