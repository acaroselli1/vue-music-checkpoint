<template>
  <div class="container-fluid color">
    <div class="row">
      <div class="col-xs-4">
      </div>
      <div class="col-xs-4">
      </div>
      <div class="col-xs-4">
      </div>

    </div>
    <div class="row">
      <div class="col-xs-12">
        <div>
          <p class="project-title">Playlist</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">

      </div>
    </div>
    <div class="row">
      <div v-for="song in songs">
        <div class="col-xs-3 item">
          <div class="card">
            <img class="card-img-top" :src="song.artworkUrl100" alt="card cap">
            <div class="card-block">
              <p class="card-title song-title">{{song.trackName}}</p>
              <p class="artist">{{song.artistName}}</p>
              <p>{{song.collectionName}}</p>
              <p>{{song.collectionPrice}}</p>
              <span><button type="button" class="btn btn-primary btn-sm add" @click="addToMyTunes(song)"><span class="glyphicon glyphicon-arrow-up"></span></button>
              </span>
              <span><button type="button" class="btn btn-primary btn-sm add" @click="addToMyTunes(song)"><span class="glyphicon glyphicon-arrow-down"></span></button>
              </span>
              <span><button type="button" class="btn btn-primary btn-sm add" @click="removeTrack(song)"><span class="glyphicon glyphicon-remove-sign">Remove</span></button>
              </span>

          </div>
        </div>
        <!-- <audio id="audio-source" :src="song.previewUrl"></audio> -->
        <p>
          <audio controls id="audio-player">
            <source id="audio-source" :src="song.previewUrl" type="audio/mpeg">
          </audio>
        </p>
      </div>
    </div>


  </div>
  </div>
</template>
<script>
  export default {
    name: 'Itunes',
    data() {  // properties are being added to the data object
      return {
      }
    },
    methods: {
    
      removeTrack(song){
                this.$store.dispatch("removeTrack", song)
            } 
    },

    computed: { // computed creates a variable ,in this case songs, that is constantly the value of whatever is returned
      songs() {
        return this.$store.state.myTunes;
      }
    },
    components: {

    }
  }

</script>
<style scoped>
  .color {
    width: 50%;
    float: right;
  }

  .add {
    margin-bottom: 1vh;
  }

  .color {
    background-color: navy;
  }

  .card {
    background-color: lightblue;
  }

  .card-title {
    font-size: 2rem;
  }

  #audio-player {
    width: 100%;
    border-width: 0px 5px 5px 5px;
    border-style: solid;
    border-color: grey;
  }

  .song-title {
    font-weight: bold;
  }

  #input {
    display: flex;
    justify-content: center;
    margin-top: 20vh;
    margin-bottom: 20vh;
  }

  .card {
    border: 5px solid grey;
    height:48vh;
    text-align: center;
  }

  .item {
    margin-top: 5vh;
  }

  .card-img-top {
    width: 50%;
    height: 50%;
  }


  .project-title {
    text-align: center;
    margin-top: 0vh;
    padding-top: 5vh;
    font-size: 10rem;
    color: white;
    text-shadow: 10px 10px 20px black;
  }

  .artist {
    font-weight: bold;
  }

  #cloud {
    margin-top: 5vh;
  }

  #notes {
    position: absolute;
    top: -16vh;
    right: 6vw;
  }
</style>