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
  overflow-x: hidden
  overflow-y: scroll
  -webkit-overflow-scrolling: touch

  z-index: 0
  width: 100vw
  min-height: 1500px
  position: absolute
  bottom: auto
  left: 0

  display: flex
  align-items: flex-end
  justify-content: flex-start
  background-size: cover
  background-repeat: no-repeat
  background-image: url('~public/footer.png')
  background-position: center bottom

  @media only screen and (max-width: $mobile-screen-width)
    min-height: 700px
  
  .content
    margin: 2em 1em

  .fillet-label
    background-color: rgba(0, 0, 0, .5)
  a
    color: #fff
    text-decoration: none
</style>
