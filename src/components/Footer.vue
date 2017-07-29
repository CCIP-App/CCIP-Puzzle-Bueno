<template>
  <div id="Footer">
    <div class="content">
      COSCUP 2017 | Fork on 
      <a href="https://github.com/CCIP-App/CCIP-Puzzle-Bueno/" target="_blank" alt="Source code on GitHub">GitHub</a>
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
  display: flex
  justify-content: center
  align-items: flex-end
  flex-grow: 1
  background-size: cover
  background-repeat: no-repeat
  background-image: url('~public/footer.png')
  background-position: center top
  .content
    padding: 2em
  .fillet-label
    background-color: rgba(0, 0, 0, .5)
</style>
