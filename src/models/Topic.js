'use strict'

const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema
const TopicSchema = new Schema( {
  topicName: String,
  concepts: [ {type: Schema.Types.ObjectId, ref: 'Concept', default: []} ]
} )

module.exports = mongoose.model( 'Topic', TopicSchema )
