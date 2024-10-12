// src/components/test/__tests__/Answers.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Answers from '../Answers.vue'

describe('Answers.vue', () => {
  it('renders answers and selects an answer', async () => {
    const answers = [
      { id: 1, description: 'Answer 1', score: 10 },
      { id: 2, description: 'Answer 2', score: 20 },
    ]
    const question = { id: 1, schema_id: 1 }

    const wrapper = mount(Answers, {
      props: {
        answers,
        modelValue: [],
        question,
      },
    })

    // Проверка, что ответы рендерятся
    expect(wrapper.findAll('input[type="radio"]').length).toBe(2)
    expect(wrapper.text()).toContain('Answer 1')
    expect(wrapper.text()).toContain('Answer 2')

    // Симулируем выбор ответа
    await wrapper.find('input[type="radio"][value="1"]').setValue()

    // Проверяем, что произошло обновление modelValue
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emittedValue = wrapper.emitted('update:modelValue')[0][0]
    expect(emittedValue[0].answer_id).toBe(1)
  })
})
