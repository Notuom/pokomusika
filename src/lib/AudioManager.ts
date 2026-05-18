"use client";
import type * as Tone from "tone";
import type { SongTrackNote, SongTracks } from "./types";
import { mergeTracks } from "./utils";

export class AudioManager {
  private activeSequence: Tone.Sequence<Record<number, SongTrackNote>> | null =
    null;

  private destroyActiveSequence = async (time?: Tone.Unit.Time) => {
    if (!this.activeSequence) {
      return;
    }
    this.activeSequence.stop(time);
    this.activeSequence.dispose();
    this.activeSequence = null;

    const tone = await import("tone");
    await tone.start();
    const transport = tone.getTransport();
    transport.stop();
    transport.cancel();
  };

  constructor(private sampler: Tone.Sampler) {}

  dispose = () => {
    this.sampler.dispose();
  };

  playNote = async (note: Tone.Unit.Frequency) => {
    const tone = await import("tone");
    await tone.start();
    this.sampler.triggerAttackRelease(note, 0.1);
  };

  playSong = async (
    tracks: SongTracks,
    onStep?: (index: number) => void,
    onEnd?: () => void,
  ) => {
    const tone = await import("tone");
    await tone.start();
    const transport = tone.getTransport();

    if (this.activeSequence) {
      transport.start();
      return;
    }

    const mergedTracks = mergeTracks(tracks);

    let i = 0;
    this.activeSequence = new tone.Sequence<Record<number, SongTrackNote>>(
      (time, notesPerTrack) => {
        onStep?.(i);
        i++;

        for (const [_, note] of Object.entries(notesPerTrack)) {
          if (!this.activeSequence) {
            break;
          }
          if (!note) {
            if (i >= mergedTracks.length) {
              this.destroyActiveSequence();
              onEnd?.();
              break;
            }
            continue;
          }
          if (note.type === "music-mat") {
            this.sampler.triggerAttackRelease(note.name, 0.1, time);
          }
        }
      },
      mergedTracks,
      "8n",
    );
    this.activeSequence.debug = true;
    this.activeSequence.loop = 0;
    this.activeSequence.start(0);

    transport.loop = false;
    transport.bpm.value = 104;
    transport.start();
  };

  pause = async () => {
    const tone = await import("tone");
    await tone.start();
    tone.getTransport().pause();
  };

  stop = async () => {
    const tone = await import("tone");
    await tone.start();

    this.destroyActiveSequence();
  };
}
