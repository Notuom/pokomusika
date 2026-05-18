"use client";

import { useAudioPlayerSingleton } from "@/hooks/useAudioPlayerSingleton";
import { useAudio } from "@/stores/audio";
import { BottomBar } from "./BottomBar/BottomBar";
import { FileMenu } from "./FileMenu";
import { Timeline } from "./Timeline/Timeline";

/**
 * Composer is the top-level client component which contains the file options, timeline and piano keyboard.
 */
export const Composer = () => {
  useAudioPlayerSingleton();

  const audio = useAudio();

  if (!audio) {
    return "Loading...";
  }

  return (
    <main className="p-2 pbe-(--padding-bottom-composer)">
      <FileMenu />
      <Timeline />
      <BottomBar />
    </main>
  );
};
