"use client";
import type * as Tone from "tone";

export class AudioManager {
  constructor(private sampler: Tone.Sampler) {}

  dispose = () => {
    this.sampler.dispose();
  };

  playNote = async (note: Tone.Unit.Frequency) => {
    console.log("playNote", note);
    const tone = await import("tone");
    await tone.start();
    this.sampler.triggerAttackRelease(note, 0.5);
  };
}
