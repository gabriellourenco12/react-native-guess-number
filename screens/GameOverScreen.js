import {Image, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
    const {width, height} = useWindowDimensions();

    const marginTopDistance = height < 380 ? 40 : 100;
    const paddingHorizontalDistance = width < 600 ? 12 : 64;

    let imageSize = 300;
    let margin = 36;

    if (width > 600) {
        imageSize = 100;
        margin = 12;
    }

    const imageContainerStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
        margin: margin
    }

    return (
        <ScrollView>
            <View style={[
                styles.screen,
                {marginTop: marginTopDistance},
                {paddingHorizontal: paddingHorizontalDistance}
            ]}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageContainerStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}/>
                </View>
                <Text style={styles.summaryText}>
                    Number was: <Text style={styles.highlight}>{userNumber}</Text> {'\n'}
                    Number of rounds: <Text style={styles.highlight}>{roundsNumber}</Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // paddingHorizontal: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        color: Colors.primary500,
        fontFamily: 'open-sans-bold',
    }
})