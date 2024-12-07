import { colors } from './colors'

export const screenStyles = {
    screenContainer: {
        flex: 1,
        backgroundColor: colors.screenBackgroundColor,
        color: colors.text
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        color: colors.text,
        padding: 20,
        borderTopWidth: 2,
        borderTopColor: colors.text,
        borderBottomWidth: 2,
        borderBottomColor: colors.text,
        backgroundColor: "#3A7CA5",
        textTransform: 'uppercase'
    }
}