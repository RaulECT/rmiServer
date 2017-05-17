'use strict'

const Topic = require( './models/Topic' )
const LogManagement = require( './LogManagement' )


class TopicManagement {
  constructor() {
    this.logManagement = new LogManagement()
  }

  createTopic( token, topicData, callbak ) {
    let answer = {}

    let topic = new Topic()
    topic.topicName = topicData.name

    topic.save( ( err, topicStored ) => {
      if( err ) {
        answer.err = `Error to create topic: ${err}`
        answer.complete = false

      } else {
        this.logManagement.registerEntry( token, topicData.name, 'alta' )
        answer.complete = true
        answer.topic = topicStored
      }

      callbak( answer )
    } )

  }

  getTopicConcepts( idTopic, callbak ) {
    let answer = {}

    Topic.findById( idTopic, ( err, topic ) => {
      if ( err ) {
        answer.complete = false
      } else {
        let conceptsId = topic.concepts
        callbak( topic.concepts )
      }
    } )
  }

  addConcept( topicId, conceptId, callbak ) {
    let answer = {}

    Topic.findById( topicId, ( err, topic ) => {
      if( err ) answer.complete = false

      topic.concepts.push( conceptId )


      topic.save( ( err, topicUpdated ) => {
        if( err ) {
          answer.complete = false
        } else {
          answer.complete = true
        }

        callbak( answer )
      } )
    } )
  }

  getTopics( callbak ) {
    let answer = {}

    Topic.find( {}, ( err, topics ) => {
      if ( err ) {
        answer.complete = false
      } else {
        answer.complete = true
        answer.data = topics
      }

      callbak( answer )
    } )
  }

  modifyTopic( token, idTopic, topicData, callbak ) {
    let answer = {}

    Topic.findByIdAndUpdate( idTopic, topicData, ( err, topicUpdated ) => {
      if( err ) {
        answer.complete = false
        answer.message = `Error to modify topic: ${err}`
      } else {
        answer.complete = true
        answer.topicUpdated = topicUpdated

        this.logManagement.registerEntry( token, topicUpdated.name, 'modificacion' )
      }

      callbak( answer )
    } )
  }

  deleteTopic( token, idTopic, callbak ) {
    let answer = {}

    Topic.findById( idTopic, ( err, topic ) => {
      if( err ) {
        answer.complete = false
        answer.message = `Error to delate topic: ${err}`
      }

      if( !topic ) {
        answer.complete = false
        answer.message = 'Topic not found'
      } else {

        if( topic.concepts.length == 0 ) {
          topic.remove( err => {
            if( err ) {
              answer.complete = false
              answer.message = `Error to delate topic: ${err}`
            } else {
              answer.complete = true
              answer.message = "Topic has been remove"
              this.logManagement( token, topic.name, 'eliminacion' )
            }

            callbak( answer )
          } )
        }

      }

      callbak( answer )
    } )
  }
}

module.exports = TopicManagement
