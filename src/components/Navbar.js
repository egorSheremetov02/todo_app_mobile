import React from 'react'
import {View, StyleSheet} from 'react-native'
import {THEME} from '../theme'
import { AppTextHeader } from './ui/AppTextHeader'

export const Navbar = props => {
    return (
        <View style={styles.navbar}>
            <AppTextHeader style={styles.text}>Todo</AppTextHeader>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 65,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: THEME.MAIN_COLOR,
        paddingTop: 12,
        paddingBottom: 10
    },
    text: {
        color: '#fff',
        fontSize: 30
    }
})