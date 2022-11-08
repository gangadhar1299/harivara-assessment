import { Link } from 'react-router-dom'
import { Paper } from '../components'
import { useQuestionnaire } from '../components/Questionnaire'
import { TQuestion } from '../types'

function Success () {
  const { getFirstQuestion, questions, resetAnswers } = useQuestionnaire()
  const firstQuestion = getFirstQuestion()

  return (
    <main className='h-screen flex place-items-center justify-center flex-col gap-6'>
      <Paper className='flex flex-col place-items-center gap-6 w-11/12 md:w-1/2 py-6'>
        <h1 className='text-3xl txt-center'>Completed!</h1>
        <Link
          className='btn-primary'
          to={`/question/${firstQuestion?.id}`}
          onClick={resetAnswers}
        >
          Start again
        </Link>
      </Paper>
      <Paper className='flex flex-col place-items-center gap-6 w-11/12 md:w-1/2 py-6'>
        <h1 className='text-3xl'>Answers</h1>
        <div className='flex flex-col gap-3'>
          {Object.values(questions).map(question => (
            <Answer key={question.id} question={question} />
          ))}
        </div>
      </Paper>
    </main>
  )
}
export default Success

function Answer ({ question }: { question: TQuestion }) {
  const { getAnswer } = useQuestionnaire()
  const answer = getAnswer(question.id)

  return (
    <div>
      <p className='font-bold'>{question.name}</p>
      {question.type === 'checkbox' || question.type === 'radio' ? (
        <ul>
          {answer?.options?.map(option => (
            <li>{option.label}</li>
          ))}
        </ul>
      ) : (
        <p>{answer?.answer}</p>
      )}
    </div>
  )
}
