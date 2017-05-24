'use strict'

const User = require( './models/User' )
const TokenManagement = require( './TokenManegament' )

class UserAuth {
  constructor() {
    this.tokenManagement = new TokenManagement()
  }

  verifyUserData( userData, callbak ) {
    let userEmail = userData.email
    let userPass = userData.password

    let answer = {}
    console.log(userData)

    User.find( {"email": userEmail, "password":userPass}, ( err, user ) => {

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

  verifyUserToken( userToken, callbak ){
    let userData = this.tokenManagement.getTokenData( userToken )
    callbak( userData )
  }


}

module.exports = UserAuth
