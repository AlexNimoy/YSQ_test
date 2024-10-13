class Base64Converter {
  constructor() {}

  encode(str) {
    try {
      const encodedData = btoa(encodeURIComponent(str))
      return encodedData
    } catch (error) {
      throw new Error('Invalid string input for Base64 encoding.')
    }
  }

  decode(base64) {
    try {
      const decodedData = decodeURIComponent(atob(base64))
      return decodedData
    } catch (error) {
      throw new Error('Invalid Base64 input for decoding.')
    }
  }
}

export default Base64Converter
