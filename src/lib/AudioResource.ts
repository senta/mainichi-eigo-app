import * as FileSystem from "expo-file-system"

import { Section, Deck } from "../types/entity"
const data = require("./assets/data").default
// TODO: Use asset loader https://docs.expo.io/versions/latest/sdk/asset/
export const hasResources = (): boolean => true

export const loadDeck = (id: Deck["id"]): Deck => {
  return {
    id,
    title: "don't upload this deck.",
    section: data.map((x: any) => ({
      id: x.section,
      title: x.title,
      description: x.description,
      step2: x.step2.map(blahblah),
      step3: x.step3.map(blahblah)
    }))
  }
}

function blahblah(x: any) {
  return {
    audio: x.audio,
    text: x.en
  }
}
