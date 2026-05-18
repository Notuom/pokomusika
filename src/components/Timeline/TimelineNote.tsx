import { FaMusic, FaQuestion, FaQuestionCircle } from "react-icons/fa";
import type { SongTrackNote } from "@/lib/types";
import { noteColor, noteIcon, noteRotation } from "@/lib/utils";
import clsx from "clsx";
import { useSongStore } from "@/stores/song";

type TimelineNoteProps = {
  trackIndex: number;
  trackNoteIndex: number;
  note: SongTrackNote;
};

export const TimelineNote = ({
  trackIndex,
  trackNoteIndex,
  note,
}: TimelineNoteProps) => {
  const selection = useSongStore((state) => state.selection);
  const setSelection = useSongStore((state) => state.setSelection);

  const Icon = noteIcon(note);
  const isSelected =
    selection.trackIndex === trackIndex &&
    selection.trackNoteIndex === trackNoteIndex;

  return (
    <button
      type="button"
      className={clsx(
        "flex justify-center items-center size-24 inset-shadow-sm/50 rounded-md",
        noteColor(note),
        isSelected && ["border-dashed border-4 border-note-selected-border"],
      )}
      onClick={() => {
        setSelection(trackIndex, trackNoteIndex);
      }}
    >
      <Icon className={clsx("size-14", noteRotation(note))} />
    </button>
  );
};
