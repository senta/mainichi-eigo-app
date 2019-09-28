export interface Deck {
  title: string
  section: Section[]
}

export interface Section {
  id: number,
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
