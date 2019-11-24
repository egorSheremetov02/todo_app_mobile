import React from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { TodoForm } from '../components/TodoForm'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, deleteTodo, openTodo }) => {
    let content = (
        <FlatList
            keyExtractor={item => item.id}
            data={ todos }
            renderItem={({ item }) => (
                <Todo todo={item} deleteTodo={deleteTodo} onOpen={openTodo}></Todo>
            )}
        />
    )

    // if (todos.length === 0) {
    //     content = (
    //         <View style={styles.imageWrapper}> 
    //             <Image  
    //                 source={require('../../assets/no-items.png')}
    //                 style={styles.image}
    //             />
    //         </View>
    //     )
    // }

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