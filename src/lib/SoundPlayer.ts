import { Audio } from "expo-av"
import { PlaybackSource, PlaybackStatus } from "expo-av/build/AV"

type Event = {
  type: "finish"
}

type EventHandler = (event: Event) => void

function reportError(err: Error) {
  // TODO: report the error, but how?
  console.error(err)
}

export type SoundPlayer = ReturnType<typeof soundPlayer>

export const soundPlayer = () => {
  const listeners = new Set<EventHandler>()
  let playbackInstance: Audio.Sound | null = null

  const emit = (event: Event) => {
    for (let listener of listeners) {
      listener(event)
    }
  }

  const handlePlaybackStatusUpdate = (status: PlaybackStatus): void => {
    if (status.isLoaded === false) {
      if (status.error) {
        reportError(new Error(status.error))
      }
      return
    }

    if (status.didJustFinish) {
      emit({ type: "finish" })
    }
  }

  return Object.freeze({
    on(fn: EventHandler) {
      listeners.add(fn)
    },

    off(fn: EventHandler) {
      listeners.delete(fn)
    },

    async load(souce: PlaybackSource): Promise<void> {
      const sound = new Audio.Sound()
      sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate)

      await sound.loadAsync(
        souce,
        {
          progressUpdateIntervalMillis: 500,
          positionMillis: 0,
          shouldPlay: false,
          rate: 1.0,
          shouldCorrectPitch: false,
          volume: 1.0,
          isMuted: false,
          isLooping: false
        },
        true
      )

      playbackInstance = sound
    },

    async play(): Promise<void> {
      if (playbackInstance == null) {
        return
      }
      try {
        await playbackInstance.playAsync()
      } catch (e) {
        reportError(e)
      }
    },

    async pause(): Promise<void> {
      if (playbackInstance == null) {
        return
      }
      try {
        await playbackInstance.pauseAsync()
      } catch (e) {
        reportError(e)
      }
    },

    async stop(unload = false): Promise<void> {
      if (playbackInstance == null) {
        return
      }

      try {
        const sound = playbackInstance
        await sound.stopAsync()
        if (unload) {
          sound.unloadAsync()
        }
      } catch (e) {
        reportError(e)
      }
    }
  })
}
