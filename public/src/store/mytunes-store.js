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
    setMyTunes(state,results){
      state.myTunes = results;
    },
    
    addSong(state, song){
      state.myTunes.push(song);
      console.log(state.myTunes)
    },
    removeTrack(state, song){
    //  var index = state.myTunes.indexOf(song);
    //  state.myTunes.splice(index,1);
    },
    // promoteTrack(state, song){
    //  var index = state.myTunes.indexOf(song) 
    //  state.myTunes.splice((index-1),2,song,state.myTunes[index-1])
     
    // },
    //  demoteTrack(state, song){
    //  var index = state.myTunes.indexOf(song);
    //  state.myTunes.splice((index),2,state.myTunes[index+1],song)
    // },
  
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
     $.get("//localhost:3000/api/music").then(res =>{


      
    commit('setMyTunes', res)})
    },
  
    addToMyTunes({commit, dispatch}, song){
      //this will post to your server adding a new track to your tunes
      $.post("//localhost:3000/api/music", song).then(()=>{
        dispatch('getMyTunes')
      }) 
   
    },
  
  
  
    removeTrack({commit, dispatch},song){
      //Removes track from the database with delete
      $.ajax({
      contentType: 'application/json',
      method: 'DELETE',
      url: '//localhost:3000/api/music/' + song._id
    })
     .then((res)=>{
        dispatch('getMyTunes')
      }) 
      .fail(()=>{console.log('Could not delete')})
  },	
     
     
   
    promoteTrack({commit, dispatch}, song){
      //this should increase the position / upvotes and downvotes on the track
    //  commit('promoteTrack', song)
    },
    
    demoteTrack({commit, dispatch}, song){
      //this should decrease the position / upvotes and downvotes on the track
    //  commit('demoteTrack', song)
    }

  }
})

export default store
