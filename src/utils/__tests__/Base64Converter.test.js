import { describe, it, expect } from 'vitest'
import Base64Converter from '../Base64Converter' // Ensure the path is correct

describe('Base64Converter', () => {
  const converter = new Base64Converter()

  it('should encode a string to Base64 and decode it back', () => {
    const originalString = 'Hello, world!'

    const base64 = converter.encode(originalString)
    const decodedString = converter.decode(base64)

    expect(decodedString).toBe(originalString)
  })

  it('should handle an empty string', () => {
    const originalString = ''

    const base64 = converter.encode(originalString)
    const decodedString = converter.decode(base64)

    expect(decodedString).toBe(originalString)
  })

  it('should handle strings with special characters', () => {
    const originalString = 'Hello, 世界! 🌍'

    const base64 = converter.encode(originalString)
    const decodedString = converter.decode(base64)

    expect(decodedString).toBe(originalString)
  })

  it('should throw an error for invalid Base64 input', () => {
    const invalidBase64 = 'invalid_base64$$$'

    expect(() => converter.decode(invalidBase64)).toThrow(Error)
  })
})
