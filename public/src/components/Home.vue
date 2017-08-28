<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <mytunes></mytunes>
    <itunes></itunes>
 
  </div>
</template>

<script>
import Itunes from './Itunes'
import Mytunes from './Mytunes'
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
   components: {
   Itunes,
   Mytunes

  }
}
</script>


<style>

/*@font-face {
    font-family: Klavika Bold;
    src: url('./assets/KlavikaBold.ttf');
    }*/



.my-tunes{
  display: inline-block;
  min-height: 500px;
  min-width: 50%;
  background: green;
}

.itunes{
  display: inline-block;
  background: red;
  min-height: 500px;
  min-width: 45%;
}

</style>
