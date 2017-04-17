'use strict'

const User = require( './models/User' )
const TokenManagement = require( './TokenManegament' )

class UserAuth {
  constructor() {
    this.tokenManagement = new TokenManagement()
  }

  verifyUser( userData, callbak ) {
    let userEmail = userData.email
    let userPass = userData.password

    let answer = {}

    User.find( {email: userEmail, password: userPass}, ( err, user ) => {
      

      if( user.length == 0 ) {
        answer.complete = false
        answer.message = `User not found`
      } else {
        let token = this.tokenManagement.createToken( user )

        answer.complete = true
        answer.token = token
      }

      callbak( answer )
    } )
  }
}

module.exports = UserAuth
