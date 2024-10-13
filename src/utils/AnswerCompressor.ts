interface Answer {
  question_id: number
  schema_id: number
  answer_id: number
  answer_score: number
}

interface CompressedData {
  answers: Answer[]
}

class AnswerCompressor {
  // Maps for encoding and decoding answer IDs
  private static readonly answerMap: Record<number, string> = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'f',
    6: 'e',
  }

  private static readonly answerMapReverse: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    f: 5,
    e: 6,
  }

  // Compress answers into a string using run-length encoding
  static compress(data: CompressedData): string {
    // Sort answers by question_id without mutating the original array
    const sortedAnswers = [...data.answers].sort(
      (a, b) => a.question_id - b.question_id
    )

    let compressed = ''
    let prevChar = ''
    let count = 0

    for (const answer of sortedAnswers) {
      const char = this.answerMap[answer.answer_id]
      if (char === prevChar) {
        count++
      } else {
        if (count > 0) {
          compressed += `${prevChar}${count}`
        }
        prevChar = char
        count = 1
      }
    }

    // Append the last sequence
    if (count > 0) {
      compressed += `${prevChar}${count}`
    }

    return compressed
  }

  // Decompress the string back into the original answers
  static decompress(compressedString: string): CompressedData {
    const answers: Answer[] = []
    let questionId = 1

    const regex = /([a-z])(\d+)/g
    let match: RegExpExecArray | null

    while ((match = regex.exec(compressedString)) !== null) {
      const [, char, countStr] = match
      const count = parseInt(countStr, 10)
      const answerId = this.answerMapReverse[char]

      for (let i = 0; i < count; i++) {
        const schemaId = ((questionId - 1) % 18) + 1
        answers.push({
          question_id: questionId,
          schema_id: schemaId,
          answer_id: answerId,
          answer_score: answerId,
        })
        questionId++
      }
    }

    return { answers }
  }
}

export default AnswerCompressor
