import { Section, Deck } from "../types/entity"

// TODO: Use asset loader https://docs.expo.io/versions/latest/sdk/asset/
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
      audio: require("./assets/1.mp3"),
      text: ["Hello world"]
    },
    {
      audio: require("./assets/2.mp3"),
      text: ["Good morning"]
    },
    {
      audio: require("./assets/3.mp3"),
      text: ["How are you?"]
    },
    {
      audio: require("./assets/4.mp3"),
      text: ["How was your trip?"]
    },
    {
      audio: require("./assets/5.mp3"),
      text: ["Do you enjoy rock and roll?"]
    },
    {
      audio: require("./assets/6.mp3"),
      text: ["Do your parents live near you?"]
    },
    {
      audio: require("./assets/7.mp3"),
      text: ["Are you hungly?"]
    }
  ],
  step3: [
    {
      audio: require("./assets/1.mp3"),
      text: ["Hello world"]
    },
    {
      audio: require("./assets/1.mp3"),
      text: ["Good morning"]
    },
    {
      audio: require("./assets/1.mp3"),
      text: ["How are you?"]
    },
    {
      audio: require("./assets/1.mp3"),
      text: ["How was your trip?"]
    }
  ]
})
