import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import invariant from 'tiny-invariant'
import { Button, Paper } from '../components'
import { useQuestionnaire } from '../components/Questionnaire'
import { Checkbox, Radio, Text } from '../components/Questionnaire/types'
import { TQuestion } from '../types'

function Question () {
  const { id } = useParams()
  invariant(id, 'id must be defined')

  // Passing key={id} to reset the <QuestionBox/>'s internal state

  return <QuestionBox key={id} />
}

export default Question

function QuestionBox () {
  const { id } = useParams()
  invariant(id, 'id must be defined')

  const {
    getQuestion,
    updateAnswer,
    getNextQuestion,
    getPreviousQuestion
  } = useQuestionnaire()

  const navigate = useNavigate()

  const question = getQuestion(id)

  const [isError, setIsError] = useState(false)

  if (!question) return <p>No question found with id {id}</p>

  const nextQuestion = getNextQuestion(question)
  const previousQuestion = getPreviousQuestion(question)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = Object.fromEntries(
      new FormData(evt.currentTarget).entries()
    )

    const answer =
      question.type === 'checkbox'
        ? (Object.values(formData) as string[])
        : (formData[question.id] as string)

    if (question.required && !answer) {
      setIsError(true)
      return
    }

    updateAnswer({
      questionId: question.id,
      answer:
        question.type === 'checkbox'
          ? (Object.values(answer) as string[])
          : answer
    })

    if (!nextQuestion) {
      navigate('/success')
      return
    }

    navigate(`/question/${nextQuestion.id}`)
  }

  return (
    <div className='min-h-screen flex flex-col gap-3 place-items-center justify-center'>
      <Paper className='w-11/12 md:w-1/2'>
        <form onSubmit={handleSubmit} key={id} className='flex flex-col gap-3'>
          <h1 className='text-2xl text-center'>{question.name}</h1>
          <QuestionType question={question} />
          {isError ? (
            <p className='text-red-600'>This question is mandatory</p>
          ) : null}
          <div className='flex place-items-center justify-between gap-3'>
            {previousQuestion ? (
              <Link
                className='btn-primary'
                to={`/question/${previousQuestion.id}`}
                replace
              >
                Previous
              </Link>
            ) : null}
            <Button type='submit' className='ml-auto'>
              {nextQuestion ? 'Next' : 'Finish'}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

function QuestionType ({ question }: { question: TQuestion }) {
  switch (question.type) {
    case 'radio':
      return <Radio question={question} />

    case 'text':
      return <Text question={question} />

    case 'checkbox':
      return <Checkbox question={question} />

    default:
      return <p>Invalid question type</p>
  }
}
