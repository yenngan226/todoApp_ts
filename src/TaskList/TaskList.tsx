import PropTypes from 'prop-types'
import { Todo } from '../@types/todo.type'
import { todoPropType } from '../propTypes/todo.propType'

import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  handleCompleteTodo: (id: string) => () => void
  handleEditTodo: (todo: Todo) => () => void
  handleDeleteTodo: (id: string) => () => void
}
export default function TaskList({
  doneTaskList,
  todos,
  handleCompleteTodo,
  handleEditTodo,
  handleDeleteTodo
}: TaskListProps) {
  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Done Task' : 'Pending Task'}</h2>
      <div className={styles.task}>
        {todos.length
          ? todos.map((todo) => {
              return (
                <div className={styles.taskItem} key={todo.id}>
                  <input
                    type='checkbox'
                    name=''
                    className={styles.checkBox}
                    checked={todo.completed}
                    onChange={handleCompleteTodo(todo.id)}
                  />
                  <span className={`${styles.taskName} ${todo.completed ? styles.taskNameDone : ''}`}>{todo.name}</span>
                  <div className={styles.taskAction}>
                    <button className={styles.btn} onClick={handleEditTodo(todo)}>
                      🖊️
                    </button>
                    <button className={styles.btn} onClick={handleDeleteTodo(todo?.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(todoPropType),
  handleCompleteTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired
}
