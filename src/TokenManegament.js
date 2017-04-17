'use strict'

const jwt = require( 'jwt-simple' )
const config = require( '../config' )
const moment = require( 'moment' )

class TokenManagement {
  constructor() {

  }

  createToken( data ) {
    const payload = {
      sub: data._id,
      iat: moment().unix()
    }

    const token = jwt.encode( payload, config.SECRET_TOKEN )

    return token
  }
}

module.exports = TokenManagement
