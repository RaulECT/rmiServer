'use strict'

const mongoose = require( 'mongoose' )
const UserSignIn = require( './src/UserSignIn' )
const config = require( './config' )
const UserAuth = require( './src/UserAuth' )
const TopicManagement = require( './src/TopicManagement' )
const ConceptManagement = require( './src/ConceptManagement' )

mongoose.connect( config.db, ( err, res ) => {
  if( err ) console.log( `DB connection error: ${err}` )

  console.log( 'DB connection enable' )
} )

const topicManagement = new TopicManagement()
const userSignIn = new UserSignIn()
const userAuth = new UserAuth()
const conceptManagement = new ConceptManagement()

const user = {
  email : 'email10111@correo.com',
  password: 'haylmao8'
}

const verify = {
  email: 'email@correo.com',
  password: 'haylmao'
}

const createTopic = {
  name: 'Topic Name'
}

const createTopic2 = {
  name: 'Topic Name 2'
}

const topicModify = {
  topicName: 'topic new name'
}

const concept1 = {
  name: 'concept 1',
  description: 'concept 1 description '
}

const concept2 = {
  name: 'concept 2',
  description: 'concept 2 description'
}

const concept3 = {
  name: 'concept 331',
  description: 'concept 31 description'
}

const answer = userSignIn.registerUser( user, ( token ) => {
  //console.log( token )
} )


userAuth.verifyUserToken( 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTEyNTdjNjc2MGU5Nzk2ZTVhODQxODciLCJpYXQiOjE0OTQzNzQzNDN9.AJrlLsTQBXmmlcnAPouvY0ZJwCF_kDo3W66z3YC-L5Q', ( ans ) => {
  console.log( ans.sub )
} )






/*topicManagement.createTopic( createTopic, ( topic ) => {
  console.log( topic )
} )

topicManagement.createTopic( createTopic2, ( topic ) => {
  console.log( topic )
} )*/

/*
conceptManagement.createConcept('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTEyNTdjNjc2MGU5Nzk2ZTVhODQxODciLCJpYXQiOjE0OTQzNzQzNDN9.AJrlLsTQBXmmlcnAPouvY0ZJwCF_kDo3W66z3YC-L5Q', "58f51c75fd3ae63da40ad360", "58f5a4750359e83d3c50f509", concept3, ( answer ) => {
  console.log( answer )
} )


conceptManagement.createConcept( "58f51c75fd3ae63da40ad360", "58f5a4750359e83d3c50f509", concept1, ( answer ) => {
  console.log( answer )
} )

conceptManagement.createConcept( "58f51c75fd3ae63da40ad360", "58f5a4750359e83d3c50f509", concept2, ( answer ) => {
  console.log( answer )
} )*/

let modC = {
  name: "New namaae",
  description: "new descripaaation",
  availability: true
}


conceptManagement.modifyAvaliability( "58f5a4be9cb76c15945af908", "58f51c75fd3ae63da40ad360", ( answer ) => {
  console.log( answer )
} )

conceptManagement.modifyConcept( 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTEyNTdjNjc2MGU5Nzk2ZTVhODQxODciLCJpYXQiOjE0OTQzNzQzNDN9.AJrlLsTQBXmmlcnAPouvY0ZJwCF_kDo3W66z3YC-L5Q', "58f51c75fd3ae63da40ad360", "58f5a4be9cb76c15945af908", modC, ( answer ) => {
  console.log(answer)
} )

/*conceptManagement.deleteConcept( 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OTEyNTdjNjc2MGU5Nzk2ZTVhODQxODciLCJpYXQiOjE0OTQzNzQzNDN9.AJrlLsTQBXmmlcnAPouvY0ZJwCF_kDo3W66z3YC-L5Q', "58f51c75fd3ae63da40ad360", "58f5a4be9cb76c15945af909", ( answer ) => {
  console.log( answer )
} )

userAuth.verifyUser( verify, ( token ) => {
  //console.log( token )
} )

topicManagement.getTopics( ( answer ) => {
  console.log( answer )
} )*/

/*topicManagement.getTopicConcepts( "58f5a4750359e83d3c50f509", (answer) => {
  console.log(answer)
} )*/

/*topicManagement.getTopicConcepts( "58f5a4750359e83d3c50f509", ( answer ) => {
  console.log(answer)
  answer.map( ( concept ) => {
    conceptManagement.getConcept( concept )
  } )
} )*/
