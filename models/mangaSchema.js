const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mangaSchema = new Schema({
  title: String,
  img: String,
  releaseYear: Number,
  authors: String,
  genre: [String],
  totalVolumes: Number,
  ownedVolumes: [Number],
  onGoing: Boolean,
  ended: Boolean,
  startedReading: Boolean,
  finishedReading: Boolean,
  rating: Number,
  review: String,
  anime: Boolean
})

const mangaCollection = mongoose.model("Manga", mangaSchema)
module.exports = mangaCollection
