'use strict'

const mongoose = require( 'mongoose' )
const UserSignIn = require( './src/UserSignIn' )
const config = require( './config' )
const UserAuth = require( './src/UserAuth' )
const TopicManagement = require( './src/TopicManagement' )

mongoose.connect( config.db, ( err, res ) => {
  if( err ) console.log( `DB connection error: ${err}` )

  console.log( 'DB connection enable' )
} )

const topicManagement = new TopicManagement()
const userSignIn = new UserSignIn()
const userAuth = new UserAuth()


const user = {
  email : 'email8@correo.com',
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

const answer = userSignIn.registerUser( user, ( token ) => {
  //console.log( token )
} )


topicManagement.createTopic( createTopic, ( topic ) => {
  console.log( topic )
} )

topicManagement.createTopic( createTopic2, ( topic ) => {
  console.log( topic )
} )


topicManagement.deleteTopic( "58f5678b4fa55a21f824ef2f", ( answer ) => {
  console.log( answer )
} )


userAuth.verifyUser( verify, ( token ) => {
  //console.log( token )
} )
