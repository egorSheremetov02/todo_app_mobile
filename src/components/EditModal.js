import React, {useState} from 'react'
import { View, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({ visible, onCancel, todo, value, onSave }) => {

    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3){
            Alert.alert('Ошибка', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length}`)
        } else {
            onSave(title.trim())
        }
    }

    return (
        <Modal 
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.wrapper}>
                <TextInput 
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input} 
                    placeholder="Введите дело..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttonGroup} >
                    <AppButton 
                        onPress={ onCancel }
                        color={ THEME.DANGER_COLOR }
                    >
                        Отменить
                    </AppButton>
                    <AppButton 
                        title="Сохранить"
                        onPress={saveHandler}
                    >
                        Сохранить
                    </AppButton>
                </View>
            </View>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        fontSize: 20,
        padding: 5,
        borderColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'

    },
    buttonGroup: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})