import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { TodoForm } from '../components/TodoForm'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = ({ openTodo }) => {
    const {addTodo, todos, deleteTodo} = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)
    const [width, setWidth] = useState(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL)
    useEffect(() => {
        const update = () => {
            setWidth(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL)
        }
        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change')
        }
    })
    let content = (
        <View style={{ width }}>
            <FlatList
                keyExtractor={item => item.id}
                data={ todos }
                renderItem={({ item }) => (
                    <Todo todo={item} deleteTodo={deleteTodo} onOpen={changeScreen}></Todo>
                )}
            />
        </View>
    )

    return (
        <View style={styles.wrapper}>
            <TodoForm onAdd={addTodo} />
            { content }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})