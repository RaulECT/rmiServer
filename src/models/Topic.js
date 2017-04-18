'use strict'

const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema
const TopicSchema = new Schema( {
  topicName: String,
  concepts: { type: [ Schema.Types.ObjectId ], default: [] }
} )

module.exports = mongoose.model( 'Topic', TopicSchema )
