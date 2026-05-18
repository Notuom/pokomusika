/*
 * Common types used across the app go here.
 */

import type { SupportedNote } from "./notes";

export type MusicMatNote = {
  type: "music-mat";
  name: SupportedNote;
};

export type BreakNote = {
  type: "break";
};

export type NextNotePlaceholder = {
  type: "next-note-placeholder";
};

export type Note = MusicMatNote | BreakNote;

export type TrackNoteSelection = {
  trackIndex: number;
  trackNoteIndex: number;
};

export type SongTrackNote = Note | null;

export type SongTrackNotes = SongTrackNote[];

export type SongTracks = SongTrackNotes[];
