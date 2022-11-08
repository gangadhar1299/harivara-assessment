import React, { useState } from 'react'
import { TAnswer, TOption, TQuestion, TRadioQuestion } from '../../types'

type TQuestionnaireContext = {
  answers: { [questionId: string]: TAnswer }
  questions: { [questionId: string]: TQuestion }
  getQuestion: (questionId: string) => TQuestion | undefined
  getAnswer: (questionId: string) => TAnswer | undefined
  updateAnswer: (answer: TAnswer) => void
  getOption: (question: TRadioQuestion, optionId: string) => TOption | undefined
  getNextQuestion: (question: TQuestion) => TQuestion | undefined
  getPreviousQuestion: (question: TQuestion) => TQuestion | undefined
  getFirstQuestion: () => TQuestion | undefined
  resetAnswers: () => void
} | null

const QuestionnaireContext = React.createContext<TQuestionnaireContext>(null)
QuestionnaireContext.displayName = 'QuestionnaireContext'

export function useQuestionnaire () {
  const questionnaireContext = React.useContext(QuestionnaireContext)
  if (!questionnaireContext) {
    throw new Error('useQuestionnaire must be in scope with <Questionnaire />')
  }

  return questionnaireContext
}

export function Questionnaire ({
  children,
  questions,
  defaultAnswers = {}
}: {
  questions: { [questionId: string]: TQuestion }
  defaultAnswers?: { [questionId: string]: TAnswer }
  children: React.ReactNode
}) {
  const [answers, setAnswers] = useState<{ [questionId: string]: TAnswer }>(
    defaultAnswers
  )

  function getQuestion (questionId: string): TQuestion {
    return questions[questionId]
  }

  function getAnswer (questionId: string) {
    const answer = answers[questionId]
    if (!answer) return undefined
    const question = getQuestion(questionId)
    let options: TOption[] = []
    if (question.type === 'radio') {
      options = question.options.filter(option => option.id === answer.answer)
    }
    if (question.type === 'checkbox') {
      options = question.options.filter(option =>
        answer.answer?.includes(option.id)
      )
    }
    return { ...answer, options }
  }

  function updateAnswer (answer: TAnswer) {
    setAnswers(currentAnswers => ({
      ...currentAnswers,
      [answer.questionId]: answer
    }))
  }

  function getOption (question: TRadioQuestion, optionId: string) {
    return question.options?.find(option => option.id === optionId)
  }

  function getNextQuestion (question: TQuestion) {
    const keys = Object.keys(questions)
    const currentQuestionIndex = keys.indexOf(question.id)
    const nextQuestionKey = keys[currentQuestionIndex + 1]
    return questions[nextQuestionKey]
  }

  function getPreviousQuestion (question: TQuestion) {
    const keys = Object.keys(questions)
    const currentQuestionIndex = keys.indexOf(question.id)
    const nextQuestionKey = keys[currentQuestionIndex - 1]
    return questions[nextQuestionKey]
  }

  function getFirstQuestion () {
    const firstQuestion = Object.values(questions)[0]
    return firstQuestion
  }

  function resetAnswers () {
    setAnswers({})
  }

  return (
    <QuestionnaireContext.Provider
      value={{
        questions,
        answers,
        getQuestion,
        getAnswer,
        updateAnswer,
        getOption,
        getNextQuestion,
        getPreviousQuestion,
        getFirstQuestion,
        resetAnswers
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  )
}
