"use client";
import { useEffect } from "react";
import { AudioManager } from "@/lib/AudioManager";
import type { SupportedNote } from "@/lib/notes";
import { useAudioStore } from "@/stores/audio";

// Subset of supported notes for which we have samples
const SAMPLED_NOTES: SupportedNote[] = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
];

/**
 * useAudioPlayerSingleton is responsible for filling the Zustand store holding the reference to the
 * audio player instance so it's available across the app.
 */
export const useAudioPlayerSingleton = () => {
  const audioManager = useAudioStore((state) => state.audioManager);
  const setAudioManager = useAudioStore((state) => state.setAudioManager);

  useEffect(() => {
    // Import Tone.js dynamically; ensures this only runs on client
    import("tone").then((tone) => {
      const sampler = new tone.Sampler({
        // TODO credit: https://www.reddit.com/r/edmproduction/comments/avqplp/malletxylo_kit_with_200_one_shot_samples_and_key/
        urls: SAMPLED_NOTES.reduce<Record<string, string>>(
          (accumulator, currentValue) => {
            accumulator[currentValue] = encodeURIComponent(
              `Mallet ${currentValue}.wav`,
            );
            return accumulator;
          },
          {},
        ),
        release: 0.5,
        baseUrl: "/samples/",
      }).toDestination();
      sampler.volume.value = -4;

      setAudioManager(new AudioManager(sampler));
    });

    return () => {
      // Clean up on unmount
      audioManager?.dispose();
    };
  }, [audioManager, setAudioManager]);
};
