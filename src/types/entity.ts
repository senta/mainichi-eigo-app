export interface Deck {
  id: string
  title: string
  section: Section[]
}

export interface Section {
  id: number
  title: string
  description: string
  // image: string
  step2: Sentence[]
  step3: Sentence[]
}

export interface Sentence {
  audio: string // TODO: what is the actualy type of the audio files?
  text: string[]
}

export interface Playback {
  section: Section["id"] | null
  step: "step2" | "step3"
  sentence: number | null // index of current selected sentence
  playing: boolean
}
