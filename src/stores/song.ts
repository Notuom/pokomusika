import { create } from "zustand/react";
import type { Note, SongTracks, TrackNoteSelection } from "@/lib/types";

const MAX_TRACKS = 2;

type SongStoreState = {
  // Whether the song is currently playing in the timeline
  isPlaying: boolean;

  // Currently selected [track, index] pair to which the user is adding notes
  selection: TrackNoteSelection;

  // Notes on each track
  tracks: SongTracks;

  // Currently selected note index, if isPlaying is true, otherwise -1
  playheadIndex: number;
};

type SongStoreActions = {
  // Toggle play/pause
  setIsPlaying: (nextIsPlaying: boolean) => void;

  // Switch to selected track and note index
  setSelection: (nextTrackIndex: number, nextTrackNoteIndex: number) => void;

  // Add a new note to the selected [track, index]
  addOrReplaceSelectedNote: (nextNote: Note) => void;

  // Delete the selected note, moving the other notes around
  deleteSelectedNote: () => void;

  // Reset the whole song to empty
  empty: () => void;

  // Change current playhead position
  setPlayheadIndex: (nextPlayingNoteIndex: number) => void;
};

type SongStore = SongStoreState & SongStoreActions;

const emptySongSelection = (): TrackNoteSelection => ({
  trackIndex: 0,
  trackNoteIndex: 0,
});

const emptySongNotes = (): SongTracks => [[null], [null]];

export const useSongStore = create<SongStore>((set) => ({
  // State
  isPlaying: false,
  selection: emptySongSelection(),
  tracks: emptySongNotes(),
  playheadIndex: -1,

  // Actions
  setIsPlaying: (nextIsPlaying) => {
    set({
      isPlaying: nextIsPlaying,
    });
  },

  setSelection: (nextTrackIndex, nextTrackNoteIndex) => {
    set((state) => {
      // no-op
      if (
        nextTrackIndex === state.selection.trackIndex &&
        nextTrackNoteIndex === state.selection.trackNoteIndex
      ) {
        return {};
      }

      // either index out of bounds
      if (
        nextTrackIndex >= MAX_TRACKS ||
        nextTrackNoteIndex >= state.tracks[nextTrackIndex].length
      ) {
        return {};
      }

      // happy path
      return {
        selection: {
          trackIndex: nextTrackIndex,
          trackNoteIndex:
            nextTrackNoteIndex >= 0
              ? nextTrackNoteIndex
              : state.tracks[nextTrackIndex].length - 1, // negative number means latest index
        },
      };
    });
  },

  addOrReplaceSelectedNote: (nextNote) => {
    set((state) => {
      let newSelection = state.selection;

      // Copy existing tracks into new array
      const newTracks = [...state.tracks];

      // Insert breaks on the other tracks
      for (let i = 0; i < newTracks.length; i++) {
        const newTrackNotes = [...newTracks[i]];
        const oldNoteAtSelection =
          newTrackNotes[state.selection.trackNoteIndex];

        // Check if we're adding to the song or changing an existing note; add empty note and select it if so
        if (!oldNoteAtSelection) {
          // Add new empty note to track
          newTrackNotes.push(null);

          // Update selection
          newSelection = {
            trackIndex: state.selection.trackIndex,
            trackNoteIndex: newTrackNotes.length - 1,
          };
        }

        if (i === state.selection.trackIndex) {
          newTrackNotes[state.selection.trackNoteIndex] = nextNote;
        } else {
          if (
            newTrackNotes[state.selection.trackNoteIndex]?.type !== "music-mat"
          ) {
            newTrackNotes[state.selection.trackNoteIndex] = { type: "break" };
          }
        }

        // Assign mutated track to new notes array
        newTracks[i] = newTrackNotes;
      }

      return { tracks: newTracks, selection: newSelection };
    });
  },

  deleteSelectedNote: () => {
    set((state) => {
      // Copy existing tracks into new array
      const newTracks = [...state.tracks];

      // delete the selected note from all tracks
      for (let i = 0; i < newTracks.length; i++) {
        const newTrackNotes = [...newTracks[i]];
        const oldNoteAtSelection =
          newTrackNotes[state.selection.trackNoteIndex];

        // can't delete the next note placeholder (null)
        if (!oldNoteAtSelection) {
          return {};
        }

        newTrackNotes.splice(state.selection.trackNoteIndex, 1);

        // Assign mutated track to new notes array
        newTracks[i] = newTrackNotes;
      }

      // move the selection to the previous note
      const newSelection: TrackNoteSelection = {
        trackIndex: state.selection.trackIndex,
        trackNoteIndex: Math.max(state.selection.trackNoteIndex - 1, 0),
      };

      return {
        tracks: newTracks,
        selection: newSelection,
      };
    });
  },

  empty: () => {
    set({
      isPlaying: false,
      selection: emptySongSelection(),
      tracks: emptySongNotes(),
    });
  },

  setPlayheadIndex: (nextPlayheadIndex) => {
    set({
      playheadIndex: nextPlayheadIndex,
    });
  },
}));
