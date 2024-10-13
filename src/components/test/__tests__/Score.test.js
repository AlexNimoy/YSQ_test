import { describe, it, expect } from 'vitest'
import Score, { AnswerSummary } from '../Score'

describe('Score', () => {
  const schemas = [
    { id: 1, name: 'Schema 1' },
    { id: 2, name: 'Schema 2' },
  ]

  const userAnswers = [
    { schema_id: 1, answer_score: 5 },
    { schema_id: 1, answer_score: 4 },
    { schema_id: 2, answer_score: 6 },
    { schema_id: 2, answer_score: 5 },
    { schema_id: 2, answer_score: 3 },
  ]

  const scorescoreCalculator = new Score(schemas, userAnswers)

  it('should filter answers by schema id', () => {
    const filteredAnswers = scorescoreCalculator.getFilteredAnswers(1)
    expect(filteredAnswers).toEqual([
      { schema_id: 1, answer_score: 5 },
      { schema_id: 1, answer_score: 4 },
    ])
  })

  it('should calculate the sum of scores for a schema', () => {
    const sum = scorescoreCalculator.getSumOfScores(1)
    expect(sum).toBe(9)
  })

  it('should calculate percentage expression', () => {
    const percentage = scorescoreCalculator.getPercentageExpression(1)
    expect(percentage).toBe('16.00')
  })

  it('should calculate the sum of specific scores', () => {
    const sumSpecific = scorescoreCalculator.getSumOfSpecificScores(2)
    expect(sumSpecific).toBe(11)
  })

  it('should calculate percentage of specific scores', () => {
    const percentageSpecific =
      scorescoreCalculator.getPercentageSpecificScores(2)
    expect(percentageSpecific).toBe('40.00')
  })

  it('should calculate all data and return an array of AnswerSummary instances', () => {
    const calculatedData = scorescoreCalculator.calculate()
    expect(calculatedData).toHaveLength(2)
    expect(calculatedData[0]).toBeInstanceOf(AnswerSummary)
    expect(calculatedData[0].sumOfScores).toBe(9)
    expect(calculatedData[1].percentageSpecificScores).toBe('40.00')
  })
})
