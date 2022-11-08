import { invariant } from '@remix-run/router'
import { useQuestionnaire } from '.'
import { TRadioQuestion, TTextQuestion } from '../../types'

const optionClassName =
  'flex place-items-center gap-1 p-1 w-full rounded hover:bg-gray-300 py-2 px-4 cursor-pointer'

export function Text ({ question }: { question: TTextQuestion }) {
  const { getAnswer } = useQuestionnaire()

  const answer = getAnswer(question.id) || null

  return (
    <input
      type='text'
      name={question.id}
      id={question.id}
      defaultValue={answer?.answer || ''}
      placeholder={question.placeholder}
      className='border border-gray-600 py-2 px-4 rounded'
      autoFocus
    />
  )
}

export function Radio ({ question }: { question: TRadioQuestion }) {
  invariant(question.options, 'Options are mandatory for Radio type questions')

  const { getAnswer } = useQuestionnaire()

  const answer = getAnswer(question.id) || null

  return (
    <div>
      {question.options.map(option => (
        <label key={option.id} className={optionClassName} htmlFor={option.id}>
          <input
            type='radio'
            id={option.id}
            name={question.id}
            value={option.id}
            defaultChecked={answer?.answer === option.id}
          />
          <p>{option.label}</p>
        </label>
      ))}
    </div>
  )
}

export function Checkbox ({ question }: { question: TRadioQuestion }) {
  invariant(
    question.options,
    'Options are mandatory for Checkbox type questions'
  )

  const { getAnswer } = useQuestionnaire()

  const answer = getAnswer(question.id) || null

  return (
    <div>
      {question.options.map(option => (
        <label key={option.id} className={optionClassName} htmlFor={option.id}>
          <input
            type='checkbox'
            id={option.id}
            name={`${question.id}[${option.id}]`}
            value={option.id}
            defaultChecked={Boolean(
              answer && (answer?.answer as string[]).includes(option.id)
            )}
          />
          <p>{option.label}</p>
        </label>
      ))}
    </div>
  )
}
