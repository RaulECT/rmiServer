'use strict'

const TokenManagement = require( './TokenManegament' )
const User = require( './models/User' )

class UserSignIn {
  constructor() {
    this.tokenManagement = new TokenManagement()
  }

  registerUser( userData, callbak ) {
    let answer = {}

    let user = new User()
    user.email = userData.email
    user.password = userData.password

    user.save( ( err, userStored ) => {
      if( err ) {
        answer.complete = false
        answer.message = `Error to register user: ${err}`

      } else {
          const token = this.tokenManagement.createToken( userStored )

          answer.complete = true
          answer.token = token

      }


      callbak( answer )

    } )

  }


}

module.exports = UserSignIn
