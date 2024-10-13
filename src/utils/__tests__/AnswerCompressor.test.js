import { describe, it, expect } from 'vitest'
import AnswerCompressor from '../AnswerCompressor'

describe('AnswerCompressor', () => {
  it('should correctly compress answers', () => {
    const data = {
      answers: [
        { question_id: 1, answer_id: 1 },
        { question_id: 2, answer_id: 1 },
        { question_id: 3, answer_id: 2 },
        { question_id: 4, answer_id: 3 },
        { question_id: 5, answer_id: 4 },
        { question_id: 6, answer_id: 5 },
        { question_id: 7, answer_id: 6 },
      ],
    }

    const compressed = AnswerCompressor.compress(data)
    expect(compressed).toBe('a2b1c1d1f1e1') // Ожидаемое сжатие
  })

  it('should correctly decompress compressed string', () => {
    const compressedString = 'a2b1c1d1f1e1'

    const decompressed = AnswerCompressor.decompress(compressedString)
    expect(decompressed.answers).toEqual([
      { question_id: 1, schema_id: 1, answer_id: 1, answer_score: 1 },
      { question_id: 2, schema_id: 2, answer_id: 1, answer_score: 1 },
      { question_id: 3, schema_id: 3, answer_id: 2, answer_score: 2 },
      { question_id: 4, schema_id: 4, answer_id: 3, answer_score: 3 },
      { question_id: 5, schema_id: 5, answer_id: 4, answer_score: 4 },
      { question_id: 6, schema_id: 6, answer_id: 5, answer_score: 5 },
      { question_id: 7, schema_id: 7, answer_id: 6, answer_score: 6 },
    ])
  })

  it('should handle empty data correctly', () => {
    const data = { answers: [] }

    const compressed = AnswerCompressor.compress(data)
    expect(compressed).toBe('') // Ожидаемое сжатие для пустых данных

    const decompressed = AnswerCompressor.decompress(compressed)
    expect(decompressed.answers).toEqual([])
  })

  it('should correctly compress and decompress large data sets', () => {
    const data = {
      answers: [
        { question_id: 1, answer_id: 1 },
        { question_id: 2, answer_id: 1 },
        { question_id: 3, answer_id: 1 },
        { question_id: 4, answer_id: 2 },
        { question_id: 5, answer_id: 2 },
        { question_id: 6, answer_id: 2 },
      ],
    }

    const compressed = AnswerCompressor.compress(data)
    expect(compressed).toBe('a3b3') // Ожидаемое сжатие для нескольких одинаковых ответов

    const decompressed = AnswerCompressor.decompress(compressed)
    expect(decompressed.answers).toEqual([
      { question_id: 1, schema_id: 1, answer_id: 1, answer_score: 1 },
      { question_id: 2, schema_id: 2, answer_id: 1, answer_score: 1 },
      { question_id: 3, schema_id: 3, answer_id: 1, answer_score: 1 },
      { question_id: 4, schema_id: 4, answer_id: 2, answer_score: 2 },
      { question_id: 5, schema_id: 5, answer_id: 2, answer_score: 2 },
      { question_id: 6, schema_id: 6, answer_id: 2, answer_score: 2 },
    ])
  })
})
