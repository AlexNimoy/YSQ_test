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
  // Method to compress answers into a short form (standard compression)
  static compress(data: CompressedData): string {
    // Sort answers by question_id
    const sortedData = data.answers.sort(
      (a, b) => a.question_id - b.question_id
    )

    // Updated answer map using letters (short form)
    const answerMap: Record<number, string> = {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
      5: 'f',
      6: 'e',
    } // Added 6
    let compressed = ''
    let currentChar = ''
    let count = 0

    // Create encoding using run-length and letter representations
    sortedData.forEach((item) => {
      const currentAnswer = answerMap[item.answer_id]
      if (currentAnswer === currentChar) {
        count++
      } else {
        if (count > 0) {
          compressed += currentChar + count
        }
        currentChar = currentAnswer
        count = 1
      }
    })

    // Add the last group
    if (count > 0) {
      compressed += currentChar + count
    }

    return compressed
  }

  // Method to decompress the short string back into JSON format (standard decompression)
  static decompress(compressedString: string): CompressedData {
    const answerMapReverse: Record<string, number> = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      f: 5,
      e: 6,
    } // Added 6
    const answers: Answer[] = []
    let index = 0
    let i = 1

    // Decompress run-length encoding
    while (index < compressedString.length) {
      const char = compressedString[index]
      let count = ''

      // Read the number following the character
      index++
      while (
        index < compressedString.length &&
        /\d/.test(compressedString[index])
      ) {
        count += compressedString[index]
        index++
      }

      const num = parseInt(count, 10)
      for (let j = 0; j < num; j++) {
        const schema_id = ((i - 1) % 18) + 1
        const answer_id = answerMapReverse[char]

        answers.push({
          question_id: i,
          schema_id,
          answer_id,
          answer_score: answer_id,
        })
        i++
      }
    }

    return { answers }
  }
}

export default AnswerCompressor
