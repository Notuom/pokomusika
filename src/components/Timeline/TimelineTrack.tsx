import clsx from "clsx";
import type { SongTrackNotes } from "@/lib/types";
import { useSongStore } from "@/stores/song";
import { TimelineNote } from "./TimelineNote";

type TimelineTrackProps = {
  trackIndex: number;
  notes: SongTrackNotes;
};

export const TimelineTrack = ({ trackIndex, notes }: TimelineTrackProps) => {
  const selection = useSongStore((state) => state.selection);
  const setSelection = useSongStore((state) => state.setSelection);

  const isSelected = selection.trackIndex === trackIndex;

  // Render timeline in reverse in the DOM instead of CSS to keep tab index logical
  const timelineNotes = [];
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    timelineNotes.push(
      <TimelineNote
        key={`${trackIndex}-${i}-${note ?? "null"}`}
        trackIndex={trackIndex}
        trackNoteIndex={i}
        note={note}
      />,
    );
  }

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "justify-center",
        "w-full",
        "gap-2",
        "p-2",
        "rounded-2xl",
        isSelected && "bg-timeline-selected",
      )}
    >
      <button
        type="button"
        className={clsx("text-center", isSelected && "font-bold")}
        onClick={() => {
          setSelection(trackIndex, -1);
        }}
      >{`Track ${trackIndex + 1}`}</button>
      <div className="flex flex-col items-center gap-2">{timelineNotes}</div>
    </div>
  );
};
