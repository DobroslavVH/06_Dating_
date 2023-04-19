import { Dimensions } from "react-native";
import { colors } from "./colors";

export const WIDTH = Dimensions.get('screen').width
export const HEIGHT = Dimensions.get('screen').height

export const borderRadius = 16

export const spacing = {
    s1: 10,
    s2: 15,
    s3: 20,
    s4: 25,
    s5: 30
}

export const fontSize = {
    p1: 12,
    p2: 14,
    p3: 16,
    p4: 18,
    p5: 20
}

export const shadowProps = {
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
        width: 0,
        height: 5
    }
}

