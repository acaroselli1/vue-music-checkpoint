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
                    <p class="project-title">MUSIC SEARCH</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <form class="form-inline" @submit.prevent="getSongs()">
                    <div class="form-group form-group-lg" id="input">
                        <input type="text" class="form-control input-lg" v-model="artist" placeholder="Artist Name" />
                        <button type="submit" class="btn btn-primary btn-lg" id="get-music-button"> Get Music    <span class="glyphicon glyphicon-music" aria-hidden="true"></span></button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row test">
            <div v-for="song in songs">
                <div class="col-xs-4 item">
                    <div class="card">
                        <img class="card-img-top" :src="song.artworkUrl100" alt="card cap">
                        <div class="card-block">
                            <p class="card-title song-title">{{song.trackName}}</p>
                            <p class="artist">{{song.artistName}}</p>
                            <p>{{song.collectionName}}</p>
                            <p>{{song.collectionPrice}}</p>
                            <button type="button" class="btn btn-primary btn-sm add" @click="addToMyTunes(song)"><span class="glyphicon glyphicon-plus"></span>  Add to Playlist</button>
                        </div>
                    </div>
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
                artist: '',
            }
        },
        methods: {
            getSongs() {
                this.$store.dispatch("getMusicByArtist", this.artist)
            },
            addToMyTunes(song) {
                var newSong = {
                    artistName: song.artistName,
                    trackName: song.trackName,
                    collectionPrice: song.collectionPrice,
                    artworkUrl100: song.artworkUrl100,
                    collectionName: song.collectionName,
                    previewUrl: song.previewUrl
                }
                this.$store.dispatch("addToMyTunes", newSong)
            }
        },

        computed: { // computed creates a variable ,in this case songs, that is constantly the value of whatever is returned
            songs() {
                return this.$store.state.results.results;
            }
        },
        components: {

        }
    }

</script>
<style scoped>
    .test{
        margin-left:5vw;
    }
    
    .add {
        margin-bottom: 1vh;
    }

    .color {
        background-color: navy;
        width: 70%;
        float: left;
        background-size: cover;
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
        height: 60vh;
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
</style>