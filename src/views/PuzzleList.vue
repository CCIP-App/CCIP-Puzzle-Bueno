<template>
  <div id='PuzzleList'>
    <template v-if="showScanner">
      <qrcode-reader :enable="qrState" width="320px" height="240px" :noResult="true" title="" subTitle="請掃描Qrcode!" @OnSuccess="OnSuccess"></qrcode-reader>
      {{ token }}
      {{ token === ''}}
      {{ data === null && token === ''}}
    </template>
    <v-container fluid v-else-if="data !== null">
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
        qrState: true,
        token: ''
      }
    },
    computed: {
      showScanner: function() {
        return this.token === '' && this.data === null
      },
      chipsConuter: function() {
        if (this.data === null) return
        return this.data.puzzle.reduce((pv, cv) => {
          var specialChip = pv.find((el) => el.displayName === cv)
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
          window.location.search = 'token=' + Util.sha1Gen(result)
        }
      },
      loadPuzzle() {
        var self = this
        api.getPuzzle(this.token).then((res) => {
          self.data = res.data
        }).catch((error) => {
          self.$vuetify.toast.create(...['Token 無法辨識', 'bottom'])
          setTimeout(() => {
            window.location.search = ''
          }, 3 * 1000)
        })
      }
    },
    mounted() {
      var query = {}
      if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
        this.token = query.token
        this.loadPuzzle()
      }
    }
  }
</script>
