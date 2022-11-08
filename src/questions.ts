import { TQuestion } from './types'

export const questions: { [key: string]: TQuestion } = {
  1: {
    id: '1',
    type: 'radio',
    name: 'Testing Question 1',
    options: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' }
    ]
  },
  2: {
    id: '2',
    type: 'text',
    name: 'Question 2',
    placeholder: 'Enter answer',
    required: true
  },
  3: {
    id: '3',
    type: 'checkbox',
    name: 'Question 3',
    options: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' }
    ]
  }
}
