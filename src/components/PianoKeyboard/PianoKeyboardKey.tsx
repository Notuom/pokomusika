import clsx from "clsx";
import type { SupportedNote } from "@/lib/notes";
import { noteWithoutOctave } from "@/lib/utils";
import { useAudio } from "@/stores/audio";
import { useSongStore } from "@/stores/song";

export type PianoKeyboardKeyProps = {
  note: SupportedNote;
  isBlackNote: boolean;
  isAfterBlackNote: boolean;
  isLastNote: boolean;
};

export const PianoKeyboardKey = ({
  note,
  isBlackNote,
  isAfterBlackNote,
  isLastNote,
}: PianoKeyboardKeyProps) => {
  const addOrReplaceSelectedNote = useSongStore(
    (state) => state.addOrReplaceSelectedNote,
  );
  const audio = useAudio();

  if (!audio) {
    return null;
  }

  const classes = [
    "flex",
    "flex-col",
    "shrink-0",
    "justify-end",
    "border-black",
    "rounded-b-lg",
    "disabled:bg-gray-300",
  ];

  if (isBlackNote) {
    // Black note
    classes.push(
      "w-8",
      "h-3/4", // takes 75% of white key height
      "-mt-0.5", // shift to the top a bit for less awkward outline
      "-ml-4", // shift to the left to overlap the white key
      "z-1", // ensure we're on top of the white key
      "text-sm/8",
      "bg-black",
      "text-white",
    );
  } else {
    // White note
    classes.push("w-12", "h-full", "text-md", "bg-white", "text-black");

    // White note after a black note needs to shift to the left
    if (isAfterBlackNote) {
      classes.push("-ml-4");
    } else {
      classes.push("ml-0.5");
    }
  }

  return (
    <button
      className={clsx(classes)}
      key={note}
      type="button"
      onClick={() => {
        audio.playNote(note);
        addOrReplaceSelectedNote({ type: "music-mat", name: note });
      }}
      disabled={isLastNote}
    >
      {noteWithoutOctave(note)}
    </button>
  );
};
