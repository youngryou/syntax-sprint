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
    const currentIndex = userInput.length

    if (e.key === 'Tab') {
      e.preventDefault()
      inputChange(userInput + '  ')
    }

    if (e.key === 'Enter') {
      e.preventDefault()

      if (snippetCode[currentIndex] === '\n') {
        let indent = ''
        let nextIndex = currentIndex + 1

        while (snippetCode[nextIndex] === ' ') {
          indent += ' '
          nextIndex++
        }
        inputChange(userInput + '\n' + indent)
      } else {
        inputChange(userInput + '\n')
      }
    }
  }

  return (
    <div className="page-section">
      <div className="card card--code">{renderTyping()}</div>

      <textarea
        id="snippet-textarea"
        className="textarea-field"
        placeholder="Type here..."
        value={userInput}
        onChange={(e) => inputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={(e) => e.preventDefault()}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    </div>
  )
}
