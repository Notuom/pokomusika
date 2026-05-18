export const SUPPORTED_NOTES: string[] = [
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
  "C#5",
] as const;

export type SupportedNote = (typeof SUPPORTED_NOTES)[number];

export type Cardinal = "north" | "east" | "south" | "west";

export type MusicMatName =
  | "c-low"
  | "d"
  | "e"
  | "f"
  | "g"
  | "a"
  | "b"
  | "c-high";

export type NoteConfig = {
  musicMat: MusicMatName;
  facing: Cardinal;
};

// Configuration for each note and each direction. We could figure this out programmatically, but this is more comprehensible.
export const NOTE_CONFIGS: Record<
  (typeof SUPPORTED_NOTES)[number],
  NoteConfig
> = {
  C3: {
    musicMat: "c-low",
    facing: "north",
  },
  "C#3": { musicMat: "c-low", facing: "west" },
  D3: { musicMat: "d", facing: "north" },
  "D#3": { musicMat: "d", facing: "west" },
  E3: { musicMat: "e", facing: "north" },
  F3: { musicMat: "f", facing: "north" },
  "F#3": { musicMat: "f", facing: "west" },
  G3: { musicMat: "g", facing: "north" },
  "G#3": { musicMat: "g", facing: "west" },
  A3: { musicMat: "a", facing: "north" },
  "A#3": { musicMat: "a", facing: "west" },
  B3: { musicMat: "b", facing: "north" },
  C4: { musicMat: "c-high", facing: "north" },
  "C#4": { musicMat: "c-high", facing: "west" },
  D4: { musicMat: "d", facing: "south" },
  "D#4": { musicMat: "d", facing: "east" },
  E4: { musicMat: "e", facing: "south" },
  F4: { musicMat: "f", facing: "south" },
  "F#4": { musicMat: "f", facing: "east" },
  G4: { musicMat: "g", facing: "south" },
  "G#4": { musicMat: "g", facing: "east" },
  A4: { musicMat: "a", facing: "south" },
  "A#4": { musicMat: "a", facing: "east" },
  B4: { musicMat: "b", facing: "south" },
  C5: { musicMat: "c-high", facing: "south" },
  "C#5": { musicMat: "c-high", facing: "east" },
} as const;
