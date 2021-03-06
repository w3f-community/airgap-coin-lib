import { CoinlibError, Domain } from './coinlib-error'

export enum SerializerErrorType {
  SERIALIZER_VERSION_MISMATCH = 'SERIALIZER_VERSION_MISMATCH',
  PROTOCOL_NOT_SUPPORTED = 'PROTOCOL_NOT_SUPPORTED',
  PROTOCOL_VERSION_MISMATCH = 'PROTOCOL_VERSION_MISMATCH',
  TYPE_NOT_SUPPORTED = 'TYPE_NOT_SUPPORTED',
  INVALID_SCHEMA = 'INVALID_SCHEMA',
  INVALID_SCHEMA_TYPE = 'INVALID_SCHEMA_TYPE',
  INVALID_HEX_STRING = 'INVALID_HEX_STRING',
  INVALID_STRING = 'INVALID_STRING',
  SCHEMA_ALREADY_EXISTS = 'SCHEMA_ALREADY_EXISTS',
  SCHEMA_DOES_NOT_EXISTS = 'SCHEMA_DOES_NOT_EXISTS',
  UNEXPECTED_PAYLOAD = 'UNEXPECTED_PAYLOAD',
  PAYLOAD_TYPE_UNKNOWN = 'PAYLOAD_TYPE_UNKNOWN',
  PAYLOAD_TYPE_MISMATCH = 'PAYLOAD_TYPE_MISMATCH',
  PAYLOAD_TYPE_NOT_SUPPORTED = 'PAYLOAD_TYPE_NOT_SUPPORTED',
  PROPERTY_IS_EMPTY = 'PROPERTY_IS_EMPTY',
  PROPERTY_INVALID = 'PROPERTY_INVALID'
}

export class SerializerError extends CoinlibError {
  constructor(code: string, description?: string) {
    super(Domain.SERIALIZER, code, description)
  }
}

// tslint:disable:max-classes-per-file

/**
 * Gets thrown if the serializer version does not match
 */
export class SerializerVersionMismatch extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.SERIALIZER_VERSION_MISMATCH, description)
  }
}

/**
 * Gets thrown if the serializer cannot handle the specified coin/protocol
 */
export class ProtocolNotSupported extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.PROTOCOL_NOT_SUPPORTED, description)
  }
}

/**
 * Gets thrown if the serializer CAN handle the specified coin/protocol, but not in this version
 */
export class ProtocolVersionMismatch extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.PROTOCOL_VERSION_MISMATCH, description)
  }
}

/**
 * Gets thrown if the specified Type is not supported
 */
export class TypeNotSupported extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.TYPE_NOT_SUPPORTED, description)
  }
}

/**
 * Gets thrown if the schema in the serializer is invalid
 */
export class InvalidSchema extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.INVALID_SCHEMA, description)
  }
}

/**
 * Gets thrown if the 2 types provided are not compatible
 */
export class InvalidSchemaType extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.INVALID_SCHEMA_TYPE, description)
  }
}

/**
 * Gets thrown if the string is not a valid hex string
 */
export class InvalidHexString extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.INVALID_HEX_STRING, description)
  }
}

/**
 * Gets thrown if the string starts with "0x". This causes problems with RLP
 */
export class InvalidString extends SerializerError {
  constructor(description?: string) {
    super(SerializerErrorType.INVALID_STRING, description)
  }
}
