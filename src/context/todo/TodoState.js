import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
  CHANGE_FETCH_STATUS
} from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: true,
    error: null,
    isFetched: false
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    const response = await fetch(
      'https://rn-todo-app-b42ed.firebaseio.com/todos.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      }
    )
    const { name } = await response.json()
    dispatch({ type: ADD_TODO, title, id: name })
  }

  const deleteTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'distructive',
          onPress: () => {
            fetch(`https://rn-todo-app-b42ed.firebaseio.com/todos/${id}.json`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: id })
            })
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodos = async (id, title) => {
    clearError()
    try {
      await fetch(`https://rn-todo-app-b42ed.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError('Что-то пошло не так...')
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const response = await fetch(
        'https://rn-todo-app-b42ed.firebaseio.com/todos.json',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const data = await response.json()
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos: todos.reverse() })
      dispatch({ type: CHANGE_FETCH_STATUS })
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log()
    } finally {
      hideLoader()
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        isFetched: state.isFetched,
        error: state.error,
        addTodo,
        deleteTodo,
        updateTodos,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
