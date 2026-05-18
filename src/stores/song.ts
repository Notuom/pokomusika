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
};

type SongStoreActions = {
  // Toggle play/pause
  toggleIsPlaying: () => void;

  // Switch to selected track and note index
  setSelection: (nextTrackIndex: number, nextTrackNoteIndex: number) => void;

  // Add a new note to the selected [track, index]
  addOrReplaceSelectedNote: (nextNote: Note) => void;
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

  // Actions
  toggleIsPlaying: () => {
    set((state) => ({
      isPlaying: !state.isPlaying,
    }));
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

      // Copy existing notes into new array
      const newNotes = [...state.tracks];

      // Copy selected track notes into new array
      const newSelectedTrackNotes = [...newNotes[state.selection.trackIndex]];
      const oldNoteAtSelection =
        newSelectedTrackNotes[state.selection.trackNoteIndex];

      // Check if we're adding to the song or changing an existing note; add empty note and select it if so
      if (oldNoteAtSelection === null) {
        // Add new empty note to track
        newSelectedTrackNotes.push(null);

        // Update selection
        newSelection = {
          trackIndex: state.selection.trackIndex,
          trackNoteIndex: newSelectedTrackNotes.length - 1,
        };
      }

      // Assign note to selected area
      newSelectedTrackNotes[state.selection.trackNoteIndex] = nextNote;

      // Assign mutated track to new notes array
      newNotes[state.selection.trackIndex] = newSelectedTrackNotes;

      return { tracks: newNotes, selection: newSelection };
    });
  },
}));
