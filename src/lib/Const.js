const DefaultHost = 'wss://jp.oxo-engine.com'
const DefaultTheme = 'light'

//1000*60*60*24=86400000
//const Epoch = Date.parse('2011-11-11 11:11:11')
const Epoch = 1320981071000

const MessageInterval = 1000

const GENESIS_ADDRESS = "oeZELFBq5mbE4y5XdvG1f3DsW85FM7HHGM"
const SYSTEM_MEDIA_ISSUER = GENESIS_ADDRESS
const SYSTEM_MEDIA_CODE = "OXO"
const SYSTEM_MEDIA_ID = `${SYSTEM_MEDIA_CODE}.${GENESIS_ADDRESS}`
const SYSTEM_MEDIA_RATE = 1000000
const SYSTEM_MEDIA_AMOUNT = 88 * 10000 * 10000 * SYSTEM_MEDIA_RATE
const ISSUER_SUBJECT_AMOUNT = SYSTEM_MEDIA_AMOUNT

const SYSTEM_ACCOUNT_RESERVE = 100 * 1000000
const SYSTEM_ISSUER_RESERVE = 1000000 * 1000000
const SYSTEM_OWNER_RESERVE = 10 * 1000000
const SYSTEM_OWNER_MAX = 64

//User
const BOTTOM_RATE = 0.0001
const BASE_RATE = 0.0005
const STEP_RATE = 0.0001
const INTEREST_DAY = 1000
const MaxRefLevel = 18

const TxResultCode = {
  trcPaymentOK: 'trcPaymentOK',
  trcSubjectProclaimOK: 'trcSubjectProclaimOK',
  trcSubjectRevokeOK: 'trcSubjectRevokeOK',
  trcTrustCreateOK: 'trcTrustCreateOK',
  trcTrustRemoveOK: 'trcTrustRemoveOK',
  trcOfferCreateOK: 'trcOfferCreateOK',
  trcOfferCancelOK: 'trcOfferCancelOK',

  // error code should never happen while using offical client
  trcUnknownError: 'trcUnknownError',

  trcAccountNotExist: 'trcAccountNotExist',
  // Payment
  trcPaySelf: 'trcPaySelf',
  trcSequenceInvalid: 'trcSequenceInvalid',
  // SM: System Media
  trcSMIssuerInvalid: 'trcSMIssuerInvalid',
  trcSMBalanceInsufficient: 'trcSMBalanceInsufficient',
  trcInsufficientToFundAccount: 'trcInsufficientToFundAccount',

  trcDestISNotTrust: 'trcDestISNotTrust',
  trcDestISNotExist: 'trcDestISNotExist',
  trcSendISNotTrust: 'trcSendISNotTrust',
  // IS: Issuer Subject
  trcISExceedMax: 'trcISExceedMax',
  trcISBalanceInsufficient: 'trcISBalanceInsufficient',

  // Subject Proclaim
  trcISEqualSM: 'trcISEqualSM',
  trcISAlreadyExist: 'trcISAlreadyExist',
  trcProclaimSubjectInvalid: 'trcProclaimSubjectInvalid',
  trcProclaimRateInvalid: 'trcProclaimRateInvalid',
  // Subject Revoke
  trcISNotExist: 'trcISNotExist',
  trcOweNotZero: 'trcOweNotZero',
  // Trust Create
  trcTrustSelf: 'trcTrustSelf',
  trcHolderAlreadyExist: 'trcHolderAlreadyExist',
  // Trust Remove
  trcHolderNotExist: 'trcHolderNotExist',
  trcHoldNotZero: 'trcHoldNotZero',
  trcOfferNotZero: 'trcOfferNotZero',

  // OfferCreate
  trcPayISNotTrust: 'trcPayISNotTrust',
  trcGetISNotTrust: 'trcGetISNotTrust',
  trcPaySameAsGet: 'trcPaySameAsGet',

  // OfferCancel
  trcOfferNotExist: 'trcOfferNotExist',

  // Genernal
  trcOwnerBookFull: 'trcOwnerBookFull'
}

const UserState = {
  Online: 'Online',
  BakOnline: 'BakOnline',
  Verify: 'Verify',
  BakVerify: 'BakVerify',
  Approve: 'Approve',
  InvalidRef: 'InvalidRef',
  Invalid: 'InvalidRef'
}

export {
  DefaultHost,
  DefaultTheme,
  Epoch,
  GENESIS_ADDRESS,
  SYSTEM_MEDIA_ISSUER,
  SYSTEM_MEDIA_CODE,
  SYSTEM_MEDIA_ID,
  SYSTEM_MEDIA_RATE,
  ISSUER_SUBJECT_AMOUNT,
  SYSTEM_OWNER_MAX,
  SYSTEM_ACCOUNT_RESERVE,
  SYSTEM_ISSUER_RESERVE,
  SYSTEM_OWNER_RESERVE,
  MessageInterval,

  BOTTOM_RATE,
  BASE_RATE,
  STEP_RATE,
  INTEREST_DAY,
  MaxRefLevel,
  UserState,

  TxResultCode
}