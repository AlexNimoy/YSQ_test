import { UserAnswer, Schema } from './types'

/**
 * Class representing the result of answer calculations for a specific schema.
 */
export class AnswerSummary {
  id: number
  name: string
  scores: number[]
  sumOfScores: number
  percentageExpression: string
  sumOfSpecificScores: number
  percentageSpecificScores: string

  /**
   * Creates an instance of AnswerSummary.
   * @param {number} id - The schema's identifier.
   * @param {string} name - The name of the schema.
   * @param {number[]} scores - An array of question scores for the schema.
   * @param {number} sumOfScores - Sum of scores for the five questions (Σ).
   * @param {string} percentageExpression - Schema expression in percentage (Σ1).
   * @param {number} sumOfSpecificScores - Sum of 5s and 6s for the five questions (Σ2).
   * @param {string} percentageSpecificScores - Percentage of 5s and 6s (Σ3).
   */
  constructor(
    id: number,
    name: string,
    scores: number[],
    sumOfScores: number,
    percentageExpression: string,
    sumOfSpecificScores: number,
    percentageSpecificScores: string
  ) {
    this.id = id
    this.name = name
    this.scores = scores
    this.sumOfScores = sumOfScores
    this.percentageExpression = percentageExpression
    this.sumOfSpecificScores = sumOfSpecificScores
    this.percentageSpecificScores = percentageSpecificScores
  }
}

/**
 * Class for calculating survey results based on early maladaptive schemas.
 */
class Score {
  schemas: Schema[]
  userAnswers: UserAnswer[]

  /**
   * Creates an instance of Score.
   * @param {Schema[]} schemas - An array of schemas.
   * @param {UserAnswer[]} userAnswers - An array of user answers.
   */
  constructor(schemas: Schema[], userAnswers: UserAnswer[]) {
    this.schemas = schemas
    this.userAnswers = userAnswers
  }

  /**
   * Filters user answers by schema identifier.
   * @param {number} schemaId - The schema's identifier.
   * @returns {UserAnswer[]} - An array of answers for the given schema.
   */
  getFilteredAnswers(schemaId: number): UserAnswer[] {
    return this.userAnswers.filter((answer) => answer.schema_id === schemaId)
  }

  /**
   * Calculates the sum of scores for the five questions (Σ) for a given schema.
   * @param {number} schemaId - The schema's identifier.
   * @returns {number} - Sum of scores for the five questions.
   */
  getSumOfScores(schemaId: number): number {
    return this.getFilteredAnswers(schemaId).reduce(
      (sum, answer) => sum + answer.answer_score,
      0
    )
  }

  /**
   * Calculates the schema expression in percentage (Σ1) for a given schema.
   * Formula: Σ1 = (Σ - 5) / 25 * 100%
   * @param {number} schemaId - The schema's identifier.
   * @returns {string} - Schema expression in percentage.
   */
  getPercentageExpression(schemaId: number): string {
    return (((this.getSumOfScores(schemaId) - 5) / 25) * 100).toFixed(2)
  }

  /**
   * Calculates the sum of 5s and 6s for the five questions (Σ2) for a given schema.
   * @param {number} schemaId - The schema's identifier.
   * @returns {number} - Sum of scores with values 5 and 6.
   */
  getSumOfSpecificScores(schemaId: number): number {
    return this.getFilteredAnswers(schemaId)
      .filter(
        (answer) => answer.answer_score === 5 || answer.answer_score === 6
      )
      .reduce((sum, answer) => sum + answer.answer_score, 0)
  }

  /**
   * Calculates the percentage of 5s and 6s (Σ3) for a given schema.
   * Formula: Σ3 = (number of 5s & 6s) / 5 * 100%
   * @param {number} schemaId - The schema's identifier.
   * @returns {string} - Percentage of answers with scores 5 and 6.
   */
  getPercentageSpecificScores(schemaId: number): string {
    return (
      (this.getFilteredAnswers(schemaId).filter(
        (answer) => answer.answer_score === 5 || answer.answer_score === 6
      ).length /
        5) *
      100
    ).toFixed(2)
  }

  /**
   * Calculates results for all schemas and returns an array of AnswerSummary objects.
   * @returns {AnswerSummary[]} - Array of results for all schemas.
   */
  calculate(): AnswerSummary[] {
    return this.schemas.map(
      (schema) =>
        new AnswerSummary(
          schema.id,
          schema.name,
          this.getFilteredAnswers(schema.id).map(
            (answer) => answer.answer_score
          ),
          this.getSumOfScores(schema.id),
          this.getPercentageExpression(schema.id),
          this.getSumOfSpecificScores(schema.id),
          this.getPercentageSpecificScores(schema.id)
        )
    )
  }
}

export default Score
