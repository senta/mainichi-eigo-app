import { Deck, Section, Sentence, Playback } from "../types/entity"
import { soundPlayer } from "./SoundPlayer"

export type Event = {
  type: "change"
  state: Playback
}

export type EventHandler = (event: Event) => any

export type DeckPlayer = ReturnType<typeof deckPlayer>

export const deckPlayer = (deck: Deck) => {
  const listeners = new Set<EventHandler>()
  const player = soundPlayer()

  let currentSection: Section["id"] | null = null
  let currentSentence: number | null = null
  let currentStep: "step2" | "step3" = "step2"
  let playing: boolean = false

  const emit = (): void => {
    const state: Playback = {
      playing,
      sectionIndex: currentSection,
      sentenceIndex: currentSentence,
      step: currentStep
    }

    for (let listener of listeners) {
      listener({ type: "change", state })
    }
  }

  player.on(event => {
    console.log(event)
    if (event.type === "finish") {
      publicInterface.nextSentence()
    }
  })

  const publicInterface = Object.freeze({
    off(fn: EventHandler) {
      listeners.delete(fn)
    },

    on(fn: EventHandler) {
      listeners.add(fn)
    },

    play(): void {
      player.play()
      playing = true
      emit()
    },

    stop(): void {
      player.stop()
      playing = false
      emit()
    },

    setSection(index: number): void {
      if (index < 0 || index >= deck.section.length) {
        throw new Error("Out of range section")
      }

      currentSection = index
      this.setSentence(0)
    },

    async setSentence(index: number): Promise<void> {
      if (currentSection == null) {
        throw new Error("The section must to be selected to set sentence")
      }
      const sentences = deck.section[currentSection][currentStep]
      if (index < 0 || index >= sentences.length) {
        throw new Error("Out of range section")
      }
      currentSentence = index

      // Play the audio
      const sentence = sentences[index]
      player.stop(true)

      await player.load(sentence.audio)
      this.play()
      emit()
    },

    nextSection(): void {
      if (currentSection == null) {
        return
      }

      const len = deck.section.length
      this.setSection((currentSection + 1) % len)
    },

    prevSection(): void {
      if (currentSection == null) {
        return
      }

      const len = deck.section.length
      this.setSection((currentSection - 1 + len) % len)
    },

    nextSentence(): void {
      if (currentSection == null || currentSentence == null) {
        return
      }

      const len = deck.section[currentSection][currentStep].length
      if (currentSentence + 1 === len) {
        this.nextSection()
      } else {
        this.setSentence(currentSentence + 1)
      }
    },

    prevSentence(): void {
      if (currentSection == null || currentSentence == null) {
        return
      }

      if (currentSentence - 1 === -1) {
        this.prevSection()
      } else {
        this.setSentence(currentSection - 1)
      }
    }
  })

  return publicInterface
}
