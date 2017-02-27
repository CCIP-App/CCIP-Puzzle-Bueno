<template>
  <div id='PuzzleList'>
    <v-container fluid>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="(card,index) in cards" class="pa-2">
          <puzzle :text="card"></puzzle>
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
      cards: function() {
        if (this.data === null) {
          return []
        } else {
          return this.data.puzzle
        }
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

<style scoped>

</style>
