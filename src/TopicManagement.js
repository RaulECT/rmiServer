'use strict'

const Topic = require( './models/Topic' )

class TopicManagement {
  constructor() {

  }

  createTopic( topicData, callbak ) {
    let answer = {}

    let topic = new Topic()
    topic.name = topicData.name

    topic.save( ( err, topicStored ) => {
      if( err ) {
        answer.err = `Error to create topic: ${err}`
        answer.complete = false

      } else {
        answer.complete = true
        answer.topic = topicStored
      }

      callbak( answer )
    } )

  }

  modifyTopic( topicData, callbak ) {
    
  }
}

module.exports = TopicManagement
