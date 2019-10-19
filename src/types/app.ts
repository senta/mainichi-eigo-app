export type Theme = {
  hsl: {
    background: [number, number, number]
    foreground: [number, number, number]
    primary: [number, number, number],
    secondary: [number, number, number]
  }
  fontSize: {
    small: number
    medium: number
    large: number
  }
  fontFamily: {
    normal: string
  }
}
