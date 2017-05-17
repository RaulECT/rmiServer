'use strict'

const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema
const LogSchema = new Schema( {
  movement: {type:String, enum: ['alta','modificacion','eliminacion']},
  item: String,
  dateMovement: {type:Date, default:Date.now},
  user:String
} )

module.exports = mongoose.model( 'Log', LogSchema )
