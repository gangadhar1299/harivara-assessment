export type TQuestionBase = {
  id: string
  name: string
  required?: boolean
}

export type TOption = {
  id: string
  label: string
  subQuestions?: { [key: string]: TQuestion }
}

export type TAnswer = {
  questionId: string
  answer?: string | string[] | null
  options?: TOption[]
}

export type TRadioQuestion = TQuestionBase & {
  type: 'radio' | 'checkbox'
  options: TOption[]
}

export type TTextQuestion = TQuestionBase & {
  type: 'text'
  placeholder?: string
}

export type TQuestion = TRadioQuestion | TTextQuestion
