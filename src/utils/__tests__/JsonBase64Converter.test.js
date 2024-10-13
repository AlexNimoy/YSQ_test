import { describe, it, expect } from 'vitest'
import JsonBase64Converter from '../JsonBase64Converter' // Adjust the path as necessary

describe('JsonBase64Converter', () => {
  const converter = new JsonBase64Converter()

  it('should convert JSON to Base64 and back', () => {
    const jsonData = { name: 'Alex', age: 30, city: 'New York' }

    const base64 = converter.jsonToBase64(jsonData)
    const jsonFromBase64 = converter.base64ToJson(base64)

    expect(jsonFromBase64).toEqual(jsonData)
  })

  it('should handle empty JSON object', () => {
    const jsonData = {}

    const base64 = converter.jsonToBase64(jsonData)
    const jsonFromBase64 = converter.base64ToJson(base64)

    expect(jsonFromBase64).toEqual(jsonData)
  })

  it('should handle JSON with special characters', () => {
    const jsonData = { message: 'Hello, 世界! 🌍' }

    const base64 = converter.jsonToBase64(jsonData)
    const jsonFromBase64 = converter.base64ToJson(base64)

    expect(jsonFromBase64).toEqual(jsonData)
  })

  it('should throw an error for invalid Base64 input', () => {
    const invalidBase64 = 'invalid_base64'

    expect(() => converter.base64ToJson(invalidBase64)).toThrow(Error)
  })
})
