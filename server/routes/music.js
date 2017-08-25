var express = require('express')
// var cors = require('cors');
var router = express.Router()
var mongoose = require('mongoose')
var server = express();



// server.use(cors());
//  TODO
var musicSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  trackName: { type: String, required: true },
  collectionPrice: { type: String, required: true },
  artworkUrl100: { type: String, required: true },
  collectionName: { type: String, required: true },
  previewUrl: { type: String, required: true },
})

var Songs = mongoose.model('Song', musicSchema)

router.get('/', function (req, res, next) {
  Songs.find({})
    .then((songs) => {
      res.send(songs)
    })
    .catch(next)
})

router.post('/', function (req, res, next) {
  Songs.create(req.body)
    .then((song) => {
      res.send(song)
    })
    .catch(next)
})

// router.get('/:blogId', function(req, res, next){
//   let blogId = req.params.blogId
//   Blogs.findById(blogId)
//   .then(blog =>{
//     if(blog){
//     res.send(blog)
//     }else{
//       next({message: 'You suck!'})
//     }
//   })
//   .catch(next)
// })

router.delete('/:songId', (req, res, next) => {
  var songId = req.params.songId
  Songs.findByIdAndRemove(songId)
    .then(song => {
      res.send({ message: 'Successfully deleted.' })
    })
    .catch(next)
})

// router.put('/:blogId', (req, res, next) =>{
//   var blogId = req.params.blogId
//   var updatedBlogObj = req.body
//   Blogs.findByIdAndUpdate(blogId, updatedBlogObj)
//   .then(blog => {
//     res.send({message: 'Successfully Updated Blog'})
//   })
//   .catch(next)
// })


router.use(defaultErrorHandler)

function defaultErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.json({ success: false, error: err })
  } else {
    res.json({ success: false, error: err.message })
  }
}

module.exports = router