<template>
  <div id="Footer">
    <div class="content">
      <a href="https://github.com/CCIP-App/CCIP-Puzzle-Bueno/" target="_blank" alt="Source code on GitHub"><span class="fillet-label">GitHub</span></a>
    </div>
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
@import "../stylus/_global/_variable"
#Footer
  .content
    padding: 2em
  .fillet-label
    background-color: rgba(0, 0, 0, .5)
  a
    color: #fff
    text-decoration: none
</style>
