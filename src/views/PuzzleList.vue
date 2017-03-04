<template>
  <div id='PuzzleList'>
    <template v-if="data === null">
      <qrcode-reader :enable="qrState" width="320px" height="240px" :noResult="true" title="" subTitle="請掃描Qrcode!" @OnSuccess="OnSuccess"></qrcode-reader>
    </template>
    <v-container fluid v-else>
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
  import Util from '../modal/util.js'
  export default {
    name: 'PuzzleList',
    data() {
      return {
        data: null,
        token: '',
        qrState: true
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
      OnSuccess(result) {
        if (result !== this.token) {
          this.token = result
        }
      }
    },
    watch: {
      token() {
        api.getPuzzle(Util.sha1Gen(this.token)).then((res) => {
          this.data = res.data
        }).catch((error) => {
          this.$vuetify.toast.create(...['發生錯誤', 'bottom'])
        })
      }
    },
    mounted() {
      let query = {}
      if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
        this.token = query.token
      }
    }
  }
</script>
