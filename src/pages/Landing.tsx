import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Paper } from '../components'
import { useQuestionnaire } from '../components/Questionnaire'

function Landing () {
  useEffect(() => {
    window.localStorage.setItem('answers', JSON.stringify(null))
  }, [])

  const { getFirstQuestion } = useQuestionnaire()
  const firstQuestion = getFirstQuestion()

  if (!firstQuestion) return <h1>There are no questions to answer!</h1>

  return (
    <main className='h-screen flex justify-center place-items-center'>
      <Paper className='w-11/12 md:w-1/2 flex justify-center place-items-center flex-col gap-6'>
        <h1 className='text-3xl text-center'>
          Click on start to start answering the questions!
        </h1>
        <Link to={`/question/${firstQuestion.id}`} className='btn-primary'>
          Start
        </Link>
      </Paper>
    </main>
  )
}

export default Landing
