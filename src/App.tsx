import { Route, Routes } from 'react-router-dom'
import { Questionnaire } from './components/Questionnaire'
import Landing from './pages/Landing'
import Question from './pages/Question'
import Success from './pages/Success'
import { questions } from './questions'

function App () {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Questionnaire questions={questions}>
        <Routes>
          <Route index element={<Landing />} />
          <Route path='/question/:id' element={<Question />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Questionnaire>
    </div>
  )
}

export default App
