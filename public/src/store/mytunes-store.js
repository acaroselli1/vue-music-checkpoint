import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var ip = "demo-deploy-acaroselli.herokuapp"

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: []
  },
  mutations: {
    setResults(state, response){
      state.results = response;
      console.log(state.results)
    },
    setMyTunes(state,response){
      state.myTunes = response;
    },
    
    // addSong(state, song){
    //   state.myTunes.push(song);
    //   console.log(state.myTunes)
    // },
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
        commit('setResults',JSON.parse(data)) // commit to the state through mutation 
      })
    },
   
   
    getMyTunes({commit, dispatch}){
      //this should send a get request to your server to return the list of saved tunes
     $.get("//demo-deploy-acaroselli.herokuapp/api/music").then(res =>{

     res.sort(function(a,b){return b.position - a.position})
      
    commit('setMyTunes', res)})
    },
  
    addToMyTunes({commit, dispatch}, song){
      //this will post to your server adding a new track to your tunes
      $.post("//demo-deploy-acaroselli.herokuapp/api/music", song).then((res)=>{
        dispatch('getMyTunes')
      }) 
   
    },
  
  
  
    removeTrack({commit, dispatch},song){
      //Removes track from the database with delete
      $.ajax({
      contentType: 'application/json',
      method: 'DELETE',
      url: '//demo-deploy-acaroselli.herokuapp/api/music/' + song._id
    })
     .then((res)=>{
        dispatch('getMyTunes')
      }) 
      .fail(()=>{console.log('Could not delete')})
  },	
     
     
   
    promoteTrack({commit, dispatch}, song){
      //this should increase the position / upvotes and downvotes on the track
    //  commit('promoteTrack', song)
		//var song = myTunes.find(song => song._id == songId)
 	   var newPosition = {"position": song.position + 1};
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: '//demo-deploy-acaroselli.herokuapp/api/music/' + song._id,
			data: JSON.stringify(newPosition)
		})
			.then((message) => {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			 dispatch('getMyTunes') // <-- LEAVE ME ALONE I WORK LIKE THIS
			})
		//	.fail(logError) // BECAUSE AJAX IS A UNIQUE SNOWFLAKE AND HAS TO BE DIFFERENT YOU CANT USE .catch
	
  
  
  
  },
    
    demoteTrack({commit, dispatch}, song){
      //this should decrease the position / upvotes and downvotes on the track
    //  commit('demoteTrack', song)
   var newPosition = {"position": song.position - 1};
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: 'demo-deploy-acaroselli.herokuapp/api/music/' + song._id,
			data: JSON.stringify(newPosition)
		})
			.then((message) => {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			 dispatch('getMyTunes')// <-- LEAVE ME ALONE I WORK LIKE THIS
			})
		//	.fail(logError) // BECAUSE AJAX IS A UNIQUE SNOWFLAKE AND HAS TO BE DIFFERENT YOU CANT USE .catch
	

  }
  } 
})

export default store
