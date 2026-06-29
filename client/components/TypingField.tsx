import { Fragment } from 'react'

interface Props {
  snippetCode: string
  userInput: string
  inputChange: (value: string) => void
}

export default function TypingField({
  snippetCode,
  userInput,
  inputChange,
}: Props) {
  const correctCharsCount = userInput
    .split('')
    .filter((char, index) => char === snippetCode[index]).length

  const progressPercent = Math.min(
    (correctCharsCount / snippetCode.length) * 100,
    100,
  )

  const renderTyping = () => {
    return snippetCode.split('').map((char, index) => {
      const charStatus =
        index < userInput.length
          ? char === userInput[index]
            ? 'correct'
            : 'incorrect'
          : index === userInput.length
            ? 'cursor'
            : 'untyped'

      const currentChar =
        char === ' ' && charStatus === 'incorrect' ? '_' : char

      return (
        <Fragment key={index}>
          <span className={`typing-char ${charStatus}`}>{currentChar}</span>
          {char === '\n' && <br />}
        </Fragment>
      )
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      inputChange(userInput + '  ')
    }
  }

  return (
    <div className="page-section">
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${progressPercent}%`,
          }}
        />
      </div>

      <div className="card card--code">{renderTyping()}</div>

      <textarea
        id="snippet-textarea"
        className="textarea-field"
        placeholder="Type here..."
        value={userInput}
        onChange={(e) => inputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </div>
  )
}
