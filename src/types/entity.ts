import { PlaybackSource } from "expo-av/build/AV"

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
  audio: PlaybackSource // TODO: what is the actualy type of the audio files?
  text: string[]
}

export interface Playback {
  sectionIndex: number | null
  step: "step2" | "step3"
  sentenceIndex: number | null // index of current selected sentence
  playing: boolean
}
