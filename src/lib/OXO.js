import '../../shim.js'
import crypto from 'crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { set } from 'immutable'
import { Epoch } from './Const'
import a from '@ant-design/react-native/lib/modal/alert'

const oxoKeyPairs = require("oxo-keypairs")

function strToHex(str) {
  let arr = []
  let length = str.length
  for (let i = 0; i < length; i++) {
    arr[i] = (str.charCodeAt(i).toString(16))
  }
  return arr.join('').toUpperCase()
}

//input encode:'utf-8', 'ascii', 'binary'
//output encode:'hex', 'binary', 'base64'
var encrypt = function (key, iv, data) {
  var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  var crypted = cipher.update(data, 'utf8', 'base64')
  crypted += cipher.final('base64')
  return crypted
}

var decrypt = function (key, iv, crypted) {
  var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  var decoded = decipher.update(crypted, 'base64', 'utf8')
  decoded += decipher.final('utf8')
  return decoded
}

function hasherSHA512(str) {
  let sha512 = crypto.createHash("sha512")
  sha512.update(str)
  return sha512.digest('hex')
}

function halfSHA512(str) {
  return hasherSHA512(str).toUpperCase().substring(0, 64)
}

function quarterSHA512(str) {
  return hasherSHA512(str).toUpperCase().substring(0, 32)
}

function AesEncrypt(content, aes_key) {
  let key = aes_key.slice(0, 32)
  let iv = aes_key.slice(32, 48)

  let str = encrypt(key, iv, content)
  return str
}

function AesDecrypt(str, aes_key) {
  let key = aes_key.slice(0, 32)
  let iv = aes_key.slice(32, 48)
  let content = decrypt(key, iv, str)
  return content
}

async function MasterKeySet(masterKey) {
  let salt = crypto.randomBytes(16).toString('hex')
  let key = halfSHA512(salt + masterKey).toString('hex').slice(0, 32)
  let iv = crypto.randomBytes(8).toString('hex')
  let info = { "MasterKey": masterKey }
  let crypted = encrypt(key, iv, JSON.stringify(info))
  let save = { "salt": salt, "iv": iv, "ct": crypted }
  try {
    await AsyncStorage.setItem('<#MasterKey#>', JSON.stringify(save))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function MasterKeyDerive(masterKey) {
  try {
    const result = await AsyncStorage.getItem('<#MasterKey#>')
    let json = JSON.parse(result)
    let key = halfSHA512(json.salt + masterKey).toString('hex').slice(0, 32)
    let mk = decrypt(key, json.iv, json.ct)
    // console.log(mk)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarCreateNew(name, password) {
  let seed = oxoKeyPairs.generateSeed(password, 'secp256k1')
  let keypair = oxoKeyPairs.deriveKeypair(seed)
  let address = oxoKeyPairs.deriveAddress(keypair.publicKey)
  let salt = crypto.randomBytes(16).toString('hex')
  let key = halfSHA512(salt + password).toString('hex').slice(0, 32)
  let iv = crypto.randomBytes(8).toString('hex')
  let msg = { "seed": seed }
  let crypted = encrypt(key, iv, JSON.stringify(msg))
  let save = { "salt": salt, "iv": iv, "ct": crypted }

  try {
    const result = await AsyncStorage.getItem('<#Avatars#>')
    // console.log(result)
    let avatar_list = []
    if (result != null) {
      avatar_list = JSON.parse(result)
    }
    avatar_list.unshift({ Name: name, Address: address, Save: JSON.stringify(save) })
    // console.log(avatar_list)
    await AsyncStorage.setItem('<#Avatars#>', JSON.stringify(avatar_list))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarCreateWithSeed(name, seed, password) {
  let keypair = oxoKeyPairs.deriveKeypair(seed)
  let address = oxoKeyPairs.deriveAddress(keypair.publicKey)
  let salt = crypto.randomBytes(16).toString('hex')
  let key = halfSHA512(salt + password).toString('hex').slice(0, 32)
  let iv = crypto.randomBytes(8).toString('hex')
  let msg = { "seed": seed }
  let crypted = encrypt(key, iv, JSON.stringify(msg))
  let save = { "salt": salt, "iv": iv, "ct": crypted }

  try {
    const result = await AsyncStorage.getItem('<#Avatars#>')
    // console.log(result)
    let avatar_list = []
    if (result != null) {
      avatar_list = JSON.parse(result)
    }
    // 去重
    for (let i = 0; i < avatar_list.length; i++) {
      const avatar = avatar_list[i]
      if (avatar.Address == address) {
        return false
      }
    }

    avatar_list.push({ Name: name, Address: address, Save: JSON.stringify(save) })
    // console.log(avatar_list)
    await AsyncStorage.setItem('<#Avatars#>', JSON.stringify(avatar_list))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarNameEdit(name, seed, password) {
  let keypair = oxoKeyPairs.deriveKeypair(seed)
  let address = oxoKeyPairs.deriveAddress(keypair.publicKey)
  let salt = crypto.randomBytes(16).toString('hex')
  let key = halfSHA512(salt + password).toString('hex').slice(0, 32)
  let iv = crypto.randomBytes(8).toString('hex')
  let msg = { "seed": seed }
  let crypted = encrypt(key, iv, JSON.stringify(msg))
  let save = { "salt": salt, "iv": iv, "ct": crypted }

  try {
    const result = await AsyncStorage.getItem('<#Avatars#>')
    // console.log(result)
    let avatar_list = []
    if (result != null) {
      avatar_list = JSON.parse(result)
      for (let i = 0; i < avatar_list.length; i++) {
        const avatar = avatar_list[i]
        if (avatar.Address == address) {
          avatar_list[i].Name = name
          avatar_list[i].Save = JSON.stringify(save)
          break
        }
      }
    }
    await AsyncStorage.setItem('<#Avatars#>', JSON.stringify(avatar_list))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarSwitch(address) {
  try {
    const result = await AsyncStorage.getItem('<#Avatars#>')
    // console.log(result)
    let avatar_list = []
    if (result != null) {
      avatar_list = JSON.parse(result)
      for (let i = 0; i < avatar_list.length; i++) {
        const avatar = avatar_list[i]
        if (avatar.Address == address) {
          avatar_list.splice(i, 1)
          avatar_list.unshift(avatar)
          break
        }
      }
    }
    await AsyncStorage.setItem('<#Avatars#>', JSON.stringify(avatar_list))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarDerive(strSave, masterKey) {
  try {
    let jsonSave = JSON.parse(strSave)
    let key = halfSHA512(jsonSave.salt + masterKey).toString('hex').slice(0, 32)
    strSave = decrypt(key, jsonSave.iv, jsonSave.ct)
    let seed = JSON.parse(strSave).seed
    return seed
  } catch (e) {
    console.log(e)
    return false
  }
}

async function AvatarRemove(address) {
  try {
    const result = await AsyncStorage.getItem('<#Avatars#>')
    // console.log(result)
    let avatar_list = []
    if (result != null) {
      avatar_list = JSON.parse(result)
      for (let i = 0; i < avatar_list.length; i++) {
        const avatar = avatar_list[i]
        if (avatar.Address == address) {
          avatar_list.splice(i, 1)
          break
        }
      }
    }
    await AsyncStorage.setItem('<#Avatars#>', JSON.stringify(avatar_list))
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

function GenCode(seed, timestamp) {
  let key_pair = oxoKeyPairs.deriveKeypair(seed)
  let code = AesEncrypt(seed, timestamp + key_pair.publicKey)
  return code
}

function ParseQrcodeAddress(qrcode) {
  try {
    let json = JSON.parse(qrcode)
    if (VerifyJsonSignature(json)) {
      return oxoKeyPairs.deriveAddress(json.PublicKey)
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

function ParseQrcodeSeed(qrcode) {
  try {
    let json = JSON.parse(qrcode)
    let keypair = oxoKeyPairs.deriveKeypair(json.Seed)
    return { Name: json.Name, Seed: json.Seed }
  } catch (e) {
    console.log(e)
    return false
  }
}

function Sign(msg, sk) {
  let msgHexStr = strToHex(msg)
  let sig = oxoKeyPairs.sign(msgHexStr, sk)
  return sig
}

function verifySignature(msg, sig, pk) {
  let hexStrMsg = strToHex(msg)
  try {
    return oxoKeyPairs.verify(hexStrMsg, sig, pk)
  } catch (e) {
    return false
  }
}

function VerifyJsonSignature(json) {
  let sig = json["Signature"]
  delete json["Signature"]
  let tmpMsg = JSON.stringify(json)
  if (verifySignature(tmpMsg, sig, json.PublicKey)) {
    json["Signature"] = sig
    return true
  } else {
    console.log('signature invalid...')
    return false
  }
}

function DeriveAddress(publicKey) {
  return oxoKeyPairs.deriveAddress(publicKey)
}

function DeriveKeypair(seed) {
  return oxoKeyPairs.deriveKeypair(seed)
}

export {
  strToHex,
  halfSHA512,
  quarterSHA512,
  encrypt,
  decrypt,
  DeriveAddress,
  DeriveKeypair,
  Sign,
  VerifyJsonSignature,
  AesEncrypt,
  AesDecrypt,
  MasterKeySet,
  MasterKeyDerive,
  AvatarCreateNew,
  AvatarCreateWithSeed,
  AvatarSwitch,
  AvatarDerive,
  AvatarRemove,
  AvatarNameEdit,
  GenCode,
  ParseQrcodeAddress,
  ParseQrcodeSeed
}