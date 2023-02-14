import React, { useEffect, useState } from 'react'
import { Todo } from '../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

// interface handleNewTodos {
//   (todos: Todo[]): Todo[]
// }
type handleNewTodos = (todos: Todo[]) => Todo[]
export default function TodoList() {
  const [todo, setTodo] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const completedTask = todo.filter((item) => item.completed)
  const notCompletedTask = todo.filter((item) => !item.completed)

  useEffect(() => {
    const todoString = localStorage.getItem('todoList')
    const todoObj = JSON.parse(todoString || '[]')
    setTodo(todoObj)
  }, [])

  const syncLocalStorage = (handleNewTodos: handleNewTodos) => {
    const todoString = localStorage.getItem('todoList')
    const todoObj = JSON.parse(todoString || '[]')
    const newTodoList = handleNewTodos(todoObj)
    localStorage.setItem('todoList', JSON.stringify(newTodoList))
  }
  const addTodo = (name: string) => {
    let todo: Todo = {
      name,
      id: `${new Date().toString()}`,
      completed: false
    }
    setTodo((prevState) => [...prevState, todo])
    syncLocalStorage((todoObj) => [...todoObj, todo])
  }
  const handleCompleteTodo = (id: string) => () => {
    const handle = (todos: Todo[]) => {
      return todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    }
    setTodo(handle)
    syncLocalStorage(handle)
  }

  const handleEditTodo = (todo: Todo) => () => {
    setCurrentTodo(todo)
  }
  const handleSubmitEdit = (name: string) => {
    const newCurrentTodo = { ...currentTodo, name }
    setTodo((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === newCurrentTodo.id) {
          return newCurrentTodo as Todo
        }
        return todo
      })
    })
    setCurrentTodo(null)
  }
  const handleDeleteTodo = (id: string) => () => {
    const handle = (todos: Todo[]) => {
      const result = [...todos]
      const findIndex = todos.findIndex((item) => item.id === id)
      if (findIndex > -1) {
        if (currentTodo?.id === id) {
          setCurrentTodo(null)
        }
        result.splice(findIndex, 1)
        return result
      }
      return todos
    }
    setTodo(handle)
    syncLocalStorage(handle)
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} handleSubmitEdit={handleSubmitEdit} />
        <TaskList
          handleEditTodo={handleEditTodo}
          doneTaskList={false}
          todos={notCompletedTask}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
        <TaskList
          handleEditTodo={handleEditTodo}
          doneTaskList
          todos={completedTask}
          handleCompleteTodo={handleCompleteTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  )
}
