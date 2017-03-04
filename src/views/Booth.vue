<template>
  <div id='Booth'>
    <qrcode-reader v-if="boothToken!==''" :enable="qrState" width="320px" height="240px" :noResult="true" :title="boothName" subTitle="請掃描Qrcode!" @OnSuccess="OnSuccess"></qrcode-reader>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  import Util from '../modal/util.js'
  export default {
    name: 'Booth',
    data() {
      return {
        boothName: 'Unknow booth',
        boothToken: '',
        qrState: true,
        buffer: ''
      }
    },
    methods: {
      OnSuccess(result) {
        if (this.buffer !== result) {
          this.buffer = result
          api.grantPuzzle(window.localStorage.getItem('token'), result).then((res) => {
            this.$vuetify.toast.create(...['發送成功' + res.data.status, 'bottom'])
          }).catch((error) => {
            this.$vuetify.toast.create(...[error.response.data.message, 'bottom'])
          })
        }
      }
    },
    mounted() {
      var self = this
      var query = {}
      console.log(window.location.hash.length)
      if (window.location.hash.length > 0 && (query = Util.parseQueryParams(window.location.hash))) {
        api.checkBoothToken(query.token).then((res) => {
          self.boothToken = query.token
          self.boothName = res.data.display_name
        }).catch((error) => {
          self.$vuetify.toast.create(...['登入失敗，請檢查連結Token是否正確？', 'bottom'])
          self.$router.replace('/')
        })
      }
    }
  }

</script>
