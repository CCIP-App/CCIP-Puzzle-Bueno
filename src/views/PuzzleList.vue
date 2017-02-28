<template>
  <div id='PuzzleList'>
    <v-container fluid>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="chip in chipsConuter" class="ma-0 pa-0">
          <chip  :displayName="chip.displayName" :count="chip.count"></chip>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  export default {
    name: 'PuzzleList',
    data() {
      return {
        data: null
      }
    },
    computed: {
      chips: function() {
        if (this.data === null) {
          return []
        } else {
          return this.data.puzzle
        }
      },
      chipsConuter: function() {
        return this.chips.reduce((pv, cv) => {
          let specialChip = pv.find((el) => el.displayName === cv)
          if (specialChip === undefined) {
            pv.push({ displayName: cv, count: 1 })
          } else {
            specialChip.count++
          }
          return pv
        }, [])
      }
    },
    mounted() {
      api.getPuzzle(this.$route.params.token).then((res) => {
        this.data = res.data
      }).catch((error) => {
        this.$vuetify.toast.create(...['發生錯誤', 'bottom'])
      })
    }
  }
</script>

