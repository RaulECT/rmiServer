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


const answer = userSignIn.registerUser( user, ( token ) => {
  //console.log( token )
} )

topicManagement.createTopic( createTopic, ( topic ) => {
  console.log( topic )
} )

userAuth.verifyUser( verify, ( token ) => {
  console.log( token )
} )
