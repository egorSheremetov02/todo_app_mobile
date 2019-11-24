import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/Card'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
import { AppText} from '../components/ui/AppText'

export const TodoScreen = ({ goBack, todo, deleteTodo, updateTodos }) => {

    const [modal, setModal] = useState(false)

    const deletePressHandler = () => {
        deleteTodo(todo.id)
    }

    const onCancel = () => {
        setModal(false)
    }

    const saveHandler = title => {
        updateTodos(todo.id, title)
        setModal(false)
    }

    return (
        <View >
            <EditModal 
                value={todo.title}
                visible={modal} 
                onCancel={ onCancel } 
                onSave={ saveHandler }
            />
            <AppCard style={styles.card}>
                <AppText style={styles.title}>{todo.title}</AppText>
                <View style={styles.editButton}>
                    <AppButton
                        color={ THEME.MAIN_COLOR }
                        onPress={() => setModal(true)}
                    >
                        <AntDesign name="edit" size={18} />
                    </AppButton>
                </View>
            </AppCard>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <AppButton 
                        color={THEME.MAIN_COLOR} 
                        onPress={goBack} 
                    >
                        <MaterialCommunityIcons name="keyboard-backspace" size={18} />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton 
                        color={THEME.DANGER_COLOR} 
                        onPress={deletePressHandler}
                    >
                        <AntDesign name="delete" size={18} />
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
    },
    editButton: {

    },
    button: {
        width: '40%'
    },
    title: {
        fontSize: 25
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
})