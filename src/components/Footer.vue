<template>
  <div id="Footer" class="mt-3">
    <a href="https://github.com/CCIP-App/CCIP-Puzzle-Bueno/" target="_blank" alt="Source code on GitHub" class="mr-2">
      <v-chip v-model="chip" class="primary white--text">
        <img src="~public/GitHub-Mark-Light-32px.png" width="16" height="16">
        <span class="pl-2">GitHub</span>
      </v-chip>
    </a>
    <a href="#/counter" alt="Source code on GitHub" class="ml-2">
      <v-chip v-model="chip" class="primary white--text">
        <v-icon>extension</v-icon><span class="pl-2">拼圖計算機</span>
      </v-chip>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      chip: true
    }
  }
}
</script>

<style lang="stylus">
  #Footer
    text-align: center
</style>
