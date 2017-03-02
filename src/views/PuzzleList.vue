<template>
  <div id='PuzzleList'>
    <v-container fluid>
      <v-row>
        <v-col md8>
          <blockquote>{{ name }}<br>{{ valid }}</blockquote>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="chip in chipsConuter" class="ma-0 pa-0">
          <chip :displayName="chip.displayName" :count="chip.count"></chip>
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
      },
      name: function() {
        if (this.data === null) return 'name: '
        else return 'name: ' + this.data.user_id
      },
      valid: function() {
        if (this.data === null) return 'valid: '
        else return 'valid: ' + ((this.data.valid) ? '已領取' : '未領取')
      }
    },
    methods: {
      parameters() {
        return location.toString().split('?').pop().split('&').map(p => {
          var ps = p.split('=')
          var o = {}
          o[ps.shift()] = ps.join('=')
          return o
        }).reduce((a, b) => {
          var o = a
          for (var k in b) {
            o[k] = b[k]
          }
          return o
        })
      }
    },
    mounted() {
      api.getPuzzle(this.parameters().token).then((res) => {
        this.data = res.data
      }).catch((error) => {
        this.$vuetify.toast.create(...['發生錯誤', 'bottom'])
      })
    }
  }
</script>
