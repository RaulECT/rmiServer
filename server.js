'use strict'

const mongoose = require( 'mongoose' )
const UserSignIn = require( './src/UserSignIn' )
const config = require( './config' )
const UserAuth = require( './src/UserAuth' )

mongoose.connect( config.db, ( err, res ) => {
  if( err ) console.log( `DB connection error: ${err}` )

  console.log( 'DB connection enable' )
} )

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

const answer = userSignIn.registerUser( user, ( token ) => {
  //console.log( token )
} )

userAuth.verifyUser( verify, ( token ) => {
  console.log( token )
} )
