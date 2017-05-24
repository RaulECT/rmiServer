'use strict'

const Log = require( './models/Log' )
const User = require( './models/User' )
const TokenManagement = require( './TokenManegament' )

class LogManagement {
  constructor() {
    this.tokenManagement = new TokenManagement()
  }

  registerEntry( userToken, item, movement ) {
    const userData = this.tokenManagement.getTokenData( userToken )

    User.findById( userData.sub, ( err, user ) => {
      //console.log(userData);

      let log = new Log()
      log.movement = movement
      log.user = user.email
      log.item = item

      log.save( ( err, logStored ) => {

      } )
    } )
  }

  getAllEntries( callbak ) {
    let answer = {}

    Log.find( {}, ( err, logs ) => {
      if ( err ) {
        answer.complete = false
      } else {
        answer.complete = true
        answer.data = logs
      }

      callbak( answer )
    } )
  }

  getItemEntries( item, callbak ) {
    let answer = {}

    Log.find( {item}, ( err, logs ) => {
      if ( err ) {
        answer.complete = false
      } else {
        answer.complete = true
        answer.data = logs
      }

      callbak( answer )
    } )
  }

  getUserEntries( user, callbak ) {
    let answer = {}

    Log.find( {user}, ( err, logs ) => {
      if ( err ) {
        answer.complete = false
      } else {
        answer.complete = true
        answer.data = logs
      }

      callbak( answer )
    } )
  }
}

module.exports = LogManagement
