<template>
  <div id='AddPuzzle'>
    <qrcode-reader :enable="qrState" width="320px" height="240px" :noResult="true" :title="boothName" subTitle="請掃描Qrcode!" @OnSuccess="OnSuccess"></qrcode-reader>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  export default {
    name: 'AddPuzzle',
    data() {
      return {
        boothName: 'XXX',
        qrState: true
      }
    },
    methods: {
      OnSuccess(result) {
        api.grantPuzzle(window.localStorage.getItem('token'), result).then((res) => {
          this.$vuetify.toast.create(...[res.data.status, 'bottom'])
        }).catch((error) => {
          this.disabled = false
          this.$vuetify.toast.create(...[error.response.data.message, 'bottom'])
        })
      }
    }
  }
</script>
