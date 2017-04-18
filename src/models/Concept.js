'use strict'

const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema
const ConceptSchema = new Schema( {
  name: String,
  description: String,
  availability: {type: Boolean, default: true},
  idUser: Schema.Types.ObjectId,
  userModify: {type: Schema.Types.ObjectId, default: null}
} )

module.exports = mongoose.model( 'Concept', ConceptSchema )
