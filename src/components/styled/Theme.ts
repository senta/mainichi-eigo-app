import { Platform } from "react-native"
import { Theme } from "../../types/app"

const common: Pick<Theme, "fontFamily" | "fontSize"> = {
  fontSize: {
    small: 11,
    medium: 15,
    large: 24
  },
  fontFamily: {
    normal: Platform.OS === "ios" ? "System" : "Roboto"
  }
}

export const darkTheme: Theme = {
  ...common,
  hsl: {
    background: [231, 15, 16],
    foreground: [60, 10, 96],
    primary: [210, 79, 46],
    secondary: [210, 79, 26]
  }
}

export const lightTheme: Theme = {
  ...common,
  hsl: {
    background: [0, 0, 100],
    foreground: [0, 0, 1],
    primary: [38, 87, 60],
    secondary: [234, 83, 98]
  }
}
