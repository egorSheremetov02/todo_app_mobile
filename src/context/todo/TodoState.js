import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [{id: '1', title: 'Context actually works!'}]
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = title => dispatch({type: ADD_TODO, title})

    const deleteTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
                {
                    text: 'Удалить',
                    style: 'distructive', 
                    onPress: () => {
                        changeScreen(null)
                        dispatch({type: REMOVE_TODO, id})
                    }
                },
            ],
            {cancelable: false},
        )
    }

    const updateTodos = (id, title) => dispatch({ type: UPDATE_TODO, id, title})

    return (
    <TodoContext.Provider value={{
            todos: state.todos,
            addTodo,
            deleteTodo,
            updateTodos
        }}
    >
        {children}
    </TodoContext.Provider>
    )
}