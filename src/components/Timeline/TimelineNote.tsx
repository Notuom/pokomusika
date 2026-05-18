import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SongTrackNote } from "@/lib/types";
import { noteColor, noteIcon, noteRotation } from "@/lib/utils";
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
  const buttonElementRef = useRef<HTMLButtonElement>(null);
  const selection = useSongStore((state) => state.selection);
  const playheadIndex = useSongStore((state) => state.playheadIndex);
  const setSelection = useSongStore((state) => state.setSelection);
  const [prevNote, setPrevNote] = useState<SongTrackNote | null>(null);

  const Icon = noteIcon(note);
  const isSelected =
    selection.trackIndex === trackIndex &&
    selection.trackNoteIndex === trackNoteIndex;

  const isPlaying = playheadIndex === trackNoteIndex && note;

  const scrollButtonIntoView = useCallback(
    () =>
      buttonElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      }),
    [],
  );

  useEffect(() => {
    if (isSelected) {
      scrollButtonIntoView();
    }
  }, [isSelected, scrollButtonIntoView]);

  useEffect(() => {
    if (isSelected) {
      scrollButtonIntoView();
    }
  }, [isSelected, scrollButtonIntoView]);

  useEffect(() => {
    if (isPlaying && selection.trackIndex === trackIndex) {
      scrollButtonIntoView();
    }
  }, [isPlaying, selection.trackIndex, trackIndex, scrollButtonIntoView]);

  if (note !== prevNote && isSelected) {
    buttonElementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setPrevNote(note);
  }

  return (
    <button
      ref={buttonElementRef}
      type="button"
      className={clsx(
        "flex justify-center items-center size-24 inset-shadow-sm/50 rounded-md",
        isSelected && ["border-dashed border-4 border-gray-800/60"],
        !isPlaying && noteColor(note),
        isPlaying && "bg-purple-600",
      )}
      onClick={() => {
        setSelection(trackIndex, trackNoteIndex);
      }}
    >
      <Icon
        className={clsx(
          "size-14",
          noteRotation(note),
          isPlaying && "text-purple-300",
        )}
      />
    </button>
  );
};
