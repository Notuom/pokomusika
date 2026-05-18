"use client";
import { useEffect } from "react";
import { AudioManager } from "@/lib/AudioManager";
import { useAudioStore } from "@/stores/audio";

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
      setAudioManager(
        new AudioManager(
          new tone.Sampler({
            urls: {
              C3: "Casio-CTK-611-Xylophone-C4.wav",
            },
            release: 0.5,
            baseUrl: "/samples/",
          }).toDestination(),
        ),
      );
    });

    return () => {
      // Clean up on unmount
      audioManager?.dispose();
    };
  }, [audioManager, setAudioManager]);
};
