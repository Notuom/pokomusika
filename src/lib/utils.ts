import type { IconType } from "react-icons";
import { FaMusic, FaQuestion, FaQuoteRight } from "react-icons/fa6";
import { NOTE_CONFIGS, type SupportedNote } from "./notes";
import type { SongTrackNote, SongTrackNotes, SongTracks } from "./types";

export const trackKey = (notes: SongTrackNotes, index: number) => {
  return `${index}-${notes.join(",")}`;
};

export const noteWithoutOctave = (note: SupportedNote): string => {
  if (Number.isInteger(parseInt(note[note.length - 1], 10))) {
    return note.substring(0, note.length - 1);
  }

  return note;
};

export const noteIcon = (note: SongTrackNote): IconType => {
  if (!note) {
    return FaQuestion;
  }

  if (note.type === "break") {
    return FaQuoteRight;
  }

  return FaMusic;
};

export const noteColor = (note: SongTrackNote): string => {
  if (!note) {
    return "bg-gray-500";
  }

  if (note.type === "break") {
    return "bg-taupe-400";
  }

  switch (NOTE_CONFIGS[note.name].musicMat) {
    case "c-low": {
      return "bg-note-c-low";
    }
    case "d": {
      return "bg-note-d";
    }
    case "e": {
      return "bg-note-e";
    }
    case "f": {
      return "bg-note-f";
    }
    case "g": {
      return "bg-note-g";
    }
    case "a": {
      return "bg-note-a";
    }
    case "b": {
      return "bg-note-b";
    }
    case "c-high": {
      return "bg-note-c-high";
    }
  }
};

export const noteRotation = (note: SongTrackNote): string => {
  if (!note || note.type !== "music-mat") {
    return "rotate-none";
  }

  switch (NOTE_CONFIGS[note.name].facing) {
    case "north": {
      return "rotate-none";
    }
    case "east": {
      return "rotate-90";
    }
    case "south": {
      return "rotate-180";
    }
    case "west": {
      return "rotate-270";
    }
  }
};

export type MergedTracks = Array<Record<number, SongTrackNote>>;

/**
 * The Song Store state is kept as [trackIndex, noteIndex].
 * This converts to [noteIndex][trackIndex], with `null` if the note is empty on one of the tracks, for playback.
 * We don't use an array for the inner dimension because Tone.Sequence treats that as a subdivision.
 */
export const mergeTracks = (tracks: SongTracks): MergedTracks => {
  // const result: MergedTracks = [];
  // for (let i = 0; i < tracks.length; i++) {
  //   for (let j = 0; i < tracks[i].length; j++) {
  //     if (!result[j]) {
  //       result[j] = [];
  //     }
  //     result[j][i] = tracks[i][j];
  //   }
  // }

  const maxLength = Math.max(...tracks.map((track) => track.length));
  const result = new Array<Record<number, SongTrackNote>>(maxLength);

  for (let i = 0; i < maxLength; i++) {
    result[i] = {};
    for (let j = 0; j < tracks.length; j++) {
      result[i][j] = tracks[j][i] ?? null;
    }
  }

  return result;
};
