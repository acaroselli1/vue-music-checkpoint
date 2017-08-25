import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var ip = "//localhost:3000"

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: []
  },
  mutations: {
    setResults(state, results){
      state.results = results;
    },
     addSong(state, song){
      state.myTunes.push(song);
      console.log(state.myTunes)
    },
    removeTrack(state, song){
     var index = state.myTunes.indexOf(song);
     state.myTunes.splice(index,1);
    },
    promoteTrack(state, song){
     var index = state.myTunes.indexOf(song) 
     state.myTunes.splice((index-1),2,song,state.myTunes[index-1])
     
    },
     demoteTrack(state, song){
     var index = state.myTunes.indexOf(song);
     state.myTunes.splice((index),2,state.myTunes[index+1],song)
    },
  
  },
  actions: {
    getMusicByArtist({commit, dispatch}, artist) {
      var url = '//bcw-getter.herokuapp.com/?url=';
      var url2 = 'https://itunes.apple.com/search?term=' + artist;
      var apiUrl = url + encodeURIComponent(url2);
      $.get(apiUrl).then(data=>{
       // console.log(data)
        commit('setResults',JSON.parse(data)) // commit to the state through mutation 
      console.log(JSON.parse(data))
      })
    },
    getMyTunes({commit, dispatch}){
      //this should send a get request to your server to return the list of saved tunes
    },
    addToMyTunes({commit, dispatch}, song){
      //this will post to your server adding a new track to your tunes
       commit('addSong', song);
    },
    removeTrack({commit, dispatch}, song){
      //Removes track from the database with delete
      commit('removeTrack', song)
    },
    promoteTrack({commit, dispatch}, song){
      //this should increase the position / upvotes and downvotes on the track
     commit('promoteTrack', song)
    },
    demoteTrack({commit, dispatch}, song){
      //this should decrease the position / upvotes and downvotes on the track
     commit('demoteTrack', song)
    }

  }
})

export default store
