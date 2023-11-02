import {StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";

function GuessLogItem({roundNumber, guess}) {
    return (
        <View style={styles.listItem}>
            <Text style={styles.boldText}>#{roundNumber}</Text>
            <Text style={styles.regularText}>Opponent's Guess: {guess}</Text>
        </View>
    );
}

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderRadius: 40,
        paddingVertical: 12,
        paddingHorizontal: 36,
        marginVertical: 8,
        backgroundColor: Colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 3,
    },
    regularText: {
        fontFamily: 'open-sans',
        fontSize: 18,
    },
    boldText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    }
});