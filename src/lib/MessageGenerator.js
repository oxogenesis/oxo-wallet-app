import { Sign } from './OXO'

export default class MessageGenerator {

  constructor(public_key, private_key) {
    this.PublicKey = public_key
    this.PrivateKey = private_key
  }

  signJson(json) {
    let sig = Sign(JSON.stringify(json), this.PrivateKey)
    json.Signature = sig
    return json
  }

  genQrcode() {
    let json = {
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  // Action
  msgDeclare() {
    let json = {
      "Action": "Declare",
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgApplyGiveaway(id, name, phone, code, ref, timestamp) {
    let json = {
      "Action": 'ApplyGiveaway',
      "ID": id,
      "Name": name,
      "Phone": phone,
      "Code": code,
      "Ref": ref,
      "Timestamp": timestamp,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  // Tx
  msgPayment(sequence, dest_address, issuer, subject, amount) {
    let json = {
      "TxType": "Payment",
      "Sequence": sequence,
      "DestAddress": dest_address,
      "Issuer": issuer,
      "Subject": subject,
      "Amount": amount,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgSubjectProclaim(sequence, subject, rate) {
    let json = {
      "TxType": "SubjectProclaim",
      "Sequence": sequence,
      "Subject": subject,
      "Rate": rate,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgSubjectRevoke(sequence, subject) {
    let json = {
      "TxType": "SubjectRevoke",
      "Sequence": sequence,
      "Subject": subject,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgTrustCreate(sequence, issuer, subject) {
    let json = {
      "TxType": "TrustCreate",
      "Sequence": sequence,
      "Issuer": issuer,
      "Subject": subject,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgTrustRemove(sequence, issuer, subject) {
    let json = {
      "TxType": "TrustRemove",
      "Sequence": sequence,
      "Issuer": issuer,
      "Subject": subject,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgOfferCreate(sequence, pay_issuer, pay_subject, pay_amount, get_issuer, get_subject, get_amount) {
    let json = {
      "TxType": "OfferCreate",
      "Sequence": sequence,
      "PayIssuer": pay_issuer,
      "PaySubject": pay_subject,
      "PayAmount": pay_amount,
      "GetIssuer": get_issuer,
      "GetSubject": get_subject,
      "GetAmount": get_amount,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgOfferCancel(sequence, offer_sequence) {
    let json = {
      "TxType": "OfferCancel",
      "Sequence": sequence,
      "OfferSequence": offer_sequence,
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  // Inquire
  msgInquireAccount(address) {
    let json = {
      "Inquire": 'Account',
      "Address": address,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireAccountRoot(address) {
    let json = {
      "Inquire": 'AccountRoot',
      "Address": address,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireIssuer(issuer, subject) {
    let json = {
      "Inquire": 'Issuer',
      "Issuer": issuer,
      "Subject": subject,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireHolder(address, issuer, subject) {
    let json = {
      "Inquire": 'Holder',
      "Address": address,
      "Issuer": issuer,
      "Subject": subject,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireTx(sequence) {
    let json = {
      "Inquire": 'Tx',
      "Sequence": sequence,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireDestSubject(address) {
    let json = {
      "Inquire": 'DestSubject',
      "Address": address,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireOffer(address, sequence) {
    let json = {
      "Inquire": 'Offer',
      "Address": address,
      "Sequence": sequence,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireOfferBook(pay_issuer, pay_subject, get_issuer, get_subject) {
    let json = {
      "Inquire": 'OfferBook',
      "PayIssuer": pay_issuer,
      "PaySubject": pay_subject,
      "GetIssuer": get_issuer,
      "GetSubject": get_subject,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireSubjectBook() {
    let json = {
      "Inquire": 'SubjectBook',
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

  msgInquireAffect(cursor) {
    let json = {
      "Inquire": 'Affect',
      "Cursor": cursor,
      "Timestamp": Date.now(),
      "PublicKey": this.PublicKey
    }
    return JSON.stringify(this.signJson(json))
  }

}