'use strict'

const Concept = require( './models/Concept' )
const TopicManagement = require( './TopicManagement' )

class ConceptManagement {
  constructor() {
    this.topicManagement = new TopicManagement()
  }

  createConcept( userId, topicId, conceptData, callbak ) {
    let answer = {}

    let concept = new Concept()
    concept.name = conceptData.name
    concept.description = conceptData.description
    concept.idUser = userId

    concept.save( ( err, conceptStored ) => {
      if( err ) {
        answer.complete = false
        answer.message = `Error to creat concept: ${err}`
      } else {
        answer.complete = true
        answer.concept = conceptStored

        this.topicManagement.addConcept( topicId, conceptStored._id, (ans) => {
          callbak( answer )
        } )
      }
    } )

  }

  modifyAvaliability( conceptId, userModifyId , callbak ) {
    let answer = {}

    Concept.findById( conceptId, ( err, concept ) => {
      if( err ) {
        answer.complete = false
        answer.message = `Error to change concept availability: ${err}`
        callbak( answer )
      } else {
        concept.availability = false
        concept.userModify = userModifyId
        concept.save( ( err, conceptUpdated ) => {
          answer.complete = true
          answer.message = 'Concept now cant be edited for anyone'

          callbak( answer )
        } )
      }
    } )
  }

  modifyConcept( userModifyId, conceptId, conceptData, callbak ) {
    let answer = {}

    Concept.findById( conceptId, ( err, concept ) => {

      if( !concept.availability ) {
        if( concept.userModify == userModifyId ) {
          Concept.findByIdAndUpdate( conceptId, conceptData, ( err, conceptUpdated ) => {
            answer.complete = true
            answer.conceptUpdated = conceptUpdated

            callbak( answer )
          } )
        } else {
          answer.complete = false
          answer.message = 'You can not modify this concept, some one is modify'

          callbak( answer )
        }
      }

    } )
  }
}

module.exports = ConceptManagement
