<template>
  <div id='ScanPuzzle'>
    <template v-if="data === null">
      <qrcode-reader :enable="qrState" width="320px" height="240px" :noResult="true" title="" subTitle="請掃描Qrcode!" @OnSuccess="OnSuccess"></qrcode-reader>
    </template>
    <v-container fluid  v-else>
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
    name: 'ScanPuzzle',
    data() {
      return {
        qrState: true,
        buffer: '',
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
        return 'name: ' + this.data.user_id
      },
      valid: function() {
        return 'valid: ' + ((this.data.valid) ? '已領取' : '未領取')
      }
    },
    methods: {
      OnSuccess(result) {
        if (this.buffer !== result) {
          this.buffer = result
          api.getPuzzle(result).then((res) => {
            this.data = res.data
          }).catch((error) => {
            this.$vuetify.toast.create(...['發生錯誤', 'bottom'])
          })
        }
      }
    }
  }

</script>

<style scoped>
</style>
