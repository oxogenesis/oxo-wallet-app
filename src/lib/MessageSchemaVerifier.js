//client schema
//>>>declare<<<
let DeclareSchema = {
  "type": "object",
  "required": ["Action", "Timestamp", "PublicKey", "Signature"],
  "maxProperties": 4,
  "properties": {
    "Action": {
      "type": "number"
    },
    "Timestamp": {
      "type": "number"
    },
    "PublicKey": {
      "type": "string"
    },
    "Signature": {
      "type": "string"
    }
  }
}

let Ajv = require('ajv')
let ajv = new Ajv({ allErrors: true })

//client
let vDeclare = ajv.compile(DeclareSchema)

function checkJsonSchema(json) {
  if (vDeclare(json)) {
    return true
  } else {
    return false
  }
}


function deriveJson(str) {
  try {
    let json = JSON.parse(str)
    return json
  } catch (e) {
    console.log(`not a json`)
    return false
  }
}


module.exports = {
  deriveJson,
  checkJsonSchema
}
