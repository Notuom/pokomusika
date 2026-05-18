"use client";
import { create } from "zustand/react";
import type { AudioManager } from "@/lib/AudioManager";
import type { SupportedNote } from "@/lib/notes";

type AudioStoreState = {
  audioManager: AudioManager | null;
  playNote: (note: SupportedNote) => void;
};

type AudioStoreActions = {
  setAudioManager: (sampler: AudioManager) => void;
};

type AudioStore = AudioStoreState & AudioStoreActions;

/**
 * useAudioPlayerStore exposes the Tone.js backend through a reference to the Sampler as well as util functions.
 */
export const useAudioStore = create<AudioStore>((set) => ({
  audioManager: null,
  setAudioManager: (nextAudioManager) => {
    set((state) => ({
      // Only set a new audioManager if it's not already set
      audioManager:
        state.audioManager !== null ? state.audioManager : nextAudioManager,
    }));
  },
  playNote: () => {},
}));

export const useAudio = () => useAudioStore((state) => state.audioManager);
