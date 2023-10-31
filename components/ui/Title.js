import {StyleSheet, Text, View} from "react-native";

function Title({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

export default Title;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        borderWidth: 4,
        borderRadius: 8,
        borderColor: 'white',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        padding: 12,
    }
})