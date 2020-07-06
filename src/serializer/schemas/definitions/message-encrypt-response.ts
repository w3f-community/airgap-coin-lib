export interface MessageEncryptResponse {
  id: string // Message ID used to match request/reaponse
  message: string // Message to be signed
  signature: string // Signature of the message
  ttl: string // Blockheight or timestamp to prevent replay attacks
  origin: string // eg. airgap.it
  callbackURL: string // eg. https://airgap.it/?signedMessage=
}
