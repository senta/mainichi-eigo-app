import { Section, Deck } from "../types/entity"

export const hasResources = (): boolean => true

export const loadDeck = (id: Deck["id"]): Deck => ({
  id: id,
  title: "this is a mock",
  section: new Array(30).fill(null).map((_, i) => _createSection(i))
})

const _createSection = (index: number): Section => ({
  id: index,
  title: `Section ${index} - the title can be a very very very long text. It could be like a small novel.`,
  description: "this is description for 1",
  step2: [
    {
      audio: "",
      text: ["Hello world"]
    },
    {
      audio: "",
      text: ["Good morning"]
    },
    {
      audio: "",
      text: ["How are you?"]
    },
    {
      audio: "",
      text: ["How was your trip?"]
    },
    {
      audio: "",
      text: ["Do you enjoy rock and roll?"]
    },
    {
      audio: "",
      text: ["Do your parents live near you?"]
    },
    {
      audio: "",
      text: ["Are you hungly?"]
    }
  ],
  step3: [
    {
      audio: "",
      text: ["Hello world"]
    },
    {
      audio: "",
      text: ["Good morning"]
    },
    {
      audio: "",
      text: ["How are you?"]
    },
    {
      audio: "",
      text: ["How was your trip?"]
    }
  ]
})
