import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/Colors";

// object destructuring props.children
// children is a special prop that is passed to components automatically by React Native
// and it allows us to output whatever is between the opening and closing tag of our custom component
function PrimaryButton({children, onPress}) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({pressed}) =>
                    pressed
                        ? [styles.pressed, styles.buttonInnerContainer]
                        : styles.buttonInnerContainer}
                onPress={onPress} a
                ndroid_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: .75
    }
});