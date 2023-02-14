import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import { connect } from '../../HOC/connectComponent'
import { todoPropType } from '../../propTypes/todo.propType'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  handleSubmitEdit: (name: string) => void
}

function TaskInput({ addTodo, currentTodo, handleSubmitEdit }: TaskInputProps) {
  const [taskName, setTaskName] = useState<string>('')

  useEffect(() => {
    if (currentTodo) {
      setTaskName(currentTodo.name)
    } else {
      setTaskName('')
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      handleSubmitEdit(taskName)
    } else {
      addTodo(taskName)
    }
    setTaskName('')
  }

  return (
    <div>
      <h1 className={styles.title}>Todo App</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nhập task'
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value)
          }}
        />
        <button type='submit'>✖️</button>
      </form>
    </div>
  )
}
// Trong file này export ra HOC nhận TaskInput component làm đối số và trả ra một component mới có 2 prop mới là debug và log

export default connect(TaskInput)

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([todoPropType, PropTypes.oneOf([null])]),
  handleSubmitEdit: PropTypes.func.isRequired
}
