'use strict'

const Concept = require( './models/Concept' )
const TopicManagement = require( './TopicManagement' )
const LogManagement = require( './LogManagement' )

class ConceptManagement {
  constructor() {
    this.topicManagement = new TopicManagement()
    this.logManagement = new LogManagement()
    this.concepts = []
  }

  createConcept( token,userId, topicId, conceptData, callbak ) {
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
        this.logManagement.registerEntry(token, conceptData.name, 'alta')

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

  modifyConcept( token, userModifyId, conceptId, conceptData, callbak ) {
    let answer = {}

    Concept.findById( conceptId, ( err, concept ) => {

      if( !concept.availability ) {
        if( concept.userModify == userModifyId ) {
          Concept.findByIdAndUpdate( conceptId, conceptData, ( err, conceptUpdated ) => {
            answer.complete = true
            answer.conceptUpdated = conceptUpdated

            this.logManagement.registerEntry( token, conceptUpdated.name, 'modificacion' )
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

  deleteConcept( token, userModifyId, conceptId, callbak ) {
    let answer = {}

    Concept.findById( conceptId, ( err, concept ) => {

      if( concept.idUser == userModifyId ) {
        this.logManagement.registerEntry( token, concept.name, 'eliminacion' )
        concept.remove( err => {
          if( err ) {
            answer.complete = false
            answer.message = `Error to delete concept`
          } else {
            answer.complete = true
            answer.message = 'Concept has been removed'
          }

          callbak( answer )
        } )
      } else {
        answer.complete = false
        answer.message = 'You cant delete this concept'

        callbak( answer )
      }

    } )
  }

  getAllConcepts( callbak ) {
    let answer = {}

    Concept.find( {}, ( err, concepts ) => {
      if( err ) {
        answer.complete = false
      } else {
        answer.complete = true
        answer.data = concepts
      }

      callbak( answer )
    } )
  }


  getConcept( idConcept, callbak ){
    Concept.findById( idConcept, ( err, concept ) => {
      //console.log( concept )
      this.concepts.push( concept )
      console.log( concept )
      callbak( concept )
    } )
  }
}

module.exports = ConceptManagement
