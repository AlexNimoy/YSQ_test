class JsonBase64Converter {
  constructor() {}

  // Method to convert JSON to Base64
  jsonToBase64(json) {
    const jsonString = JSON.stringify(json)
    const encodedData = btoa(encodeURIComponent(jsonString))
    return encodedData
  }

  base64ToJson(base64) {
    const decodedData = decodeURIComponent(atob(base64))
    const json = JSON.parse(decodedData)
    return json
  }
}

export default JsonBase64Converter
