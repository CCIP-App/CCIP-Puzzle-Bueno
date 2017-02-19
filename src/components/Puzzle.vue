<template>
  <div id='Puzzle'>
    <v-card>
      <v-card-text class="cardContent">
        <p class="spinner ma-0">{{text}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Puzzle',
  props: ["text","sum"]
}
</script>

<style scoped>
  .spinner {
    text-align: center;
    color: black;
    font-size: 2.5rem;
  }
  
  .cardContent {
    margin: 0 auto;
  }
</style>