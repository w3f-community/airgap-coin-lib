'use strict'
var Buffer = require('../../safe-buffer-5.2.0/index').Buffer
var bip66 = require('../../bip66-1.1.5/index')

var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
  // begin
  0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x21, 0x02, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
  // begin
  0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
  // private key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // middle
  0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48,
  0xcE, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xfE, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04,
  0x41, 0x04, 0x79, 0xbE, 0x66, 0x7E, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xcE, 0x87,
  0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xcE, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8,
  0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0E, 0x11,
  0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10,
  0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
  0xff, 0xff, 0xff, 0xff, 0xfE, 0xba, 0xaE, 0xdc, 0xE6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5E,
  0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
  // public key
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00
])

exports.privateKeyExport = function (privateKey, publicKey, compressed) {
  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED)
  privateKey.copy(result, compressed ? 8 : 9)
  publicKey.copy(result, compressed ? 181 : 214)
  return result
}

exports.privateKeyImport = function (privateKey) {
  var length = privateKey.length

  // sequence header
  var index = 0
  if (length < index + 1 || privateKey[index] !== 0x30) return
  index += 1

  // sequence length constructor
  if (length < index + 1 || !(privateKey[index] & 0x80)) return

  var lenb = privateKey[index] & 0x7f
  index += 1
  if (lenb < 1 || lenb > 2) return
  if (length < index + lenb) return

  // sequence length
  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0)
  index += lenb
  if (length < index + len) return

  // sequence element 0: version number (=1)
  if (length < index + 3 ||
      privateKey[index] !== 0x02 ||
      privateKey[index + 1] !== 0x01 ||
      privateKey[index + 2] !== 0x01) {
    return
  }
  index += 3

  // sequence element 1: octet string, up to 32 bytes
  if (length < index + 2 ||
      privateKey[index] !== 0x04 ||
      privateKey[index + 1] > 0x20 ||
      length < index + 2 + privateKey[index + 1]) {
    return
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1])
}

exports.signatureExport = function (sigObj) {
  var r = Buffer.concat([Buffer.from([0]), sigObj.r])
  for (var lenR = 33, posR = 0; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);

  var s = Buffer.concat([Buffer.from([0]), sigObj.s])
  for (var lenS = 33, posS = 0; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);

  return bip66.encode(r.slice(posR), s.slice(posS))
}

exports.signatureImport = function (sig) {
  var r = Buffer.alloc(32, 0)
  var s = Buffer.alloc(32, 0)

  try {
    var sigObj = bip66.decode(sig)
    if (sigObj.r.length === 33 && sigObj.r[0] === 0x00) sigObj.r = sigObj.r.slice(1)
    if (sigObj.r.length > 32) throw new Error('R length is too long')
    if (sigObj.s.length === 33 && sigObj.s[0] === 0x00) sigObj.s = sigObj.s.slice(1)
    if (sigObj.s.length > 32) throw new Error('S length is too long')
  } catch (err) {
    return
  }

  sigObj.r.copy(r, 32 - sigObj.r.length)
  sigObj.s.copy(s, 32 - sigObj.s.length)

  return { r: r, s: s }
}

exports.signatureImportLax = function (sig) {
  var r = Buffer.alloc(32, 0)
  var s = Buffer.alloc(32, 0)

  var length = sig.length
  var index = 0

  // sequence tag byte
  if (sig[index++] !== 0x30) return

  // sequence length byte
  var lenbyte = sig[index++]
  if (lenbyte & 0x80) {
    index += lenbyte - 0x80
    if (index > length) return
  }

  // sequence tag byte for r
  if (sig[index++] !== 0x02) return

  // length for r
  var rlen = sig[index++]
  if (rlen & 0x80) {
    lenbyte = rlen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) rlen = (rlen << 8) + sig[index]
  }
  if (rlen > length - index) return
  var rindex = index
  index += rlen

  // sequence tag byte for s
  if (sig[index++] !== 0x02) return

  // length for s
  var slen = sig[index++]
  if (slen & 0x80) {
    lenbyte = slen - 0x80
    if (index + lenbyte > length) return
    for (; lenbyte > 0 && sig[index] === 0x00; index += 1, lenbyte -= 1);
    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) slen = (slen << 8) + sig[index]
  }
  if (slen > length - index) return
  var sindex = index
  index += slen

  // ignore leading zeros in r
  for (; rlen > 0 && sig[rindex] === 0x00; rlen -= 1, rindex += 1);
  // copy r value
  if (rlen > 32) return
  var rvalue = sig.slice(rindex, rindex + rlen)
  rvalue.copy(r, 32 - rvalue.length)

  // ignore leading zeros in s
  for (; slen > 0 && sig[sindex] === 0x00; slen -= 1, sindex += 1);
  // copy s value
  if (slen > 32) return
  var svalue = sig.slice(sindex, sindex + slen)
  svalue.copy(s, 32 - svalue.length)

  return { r: r, s: s }
}
