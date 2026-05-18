/**
 * PianoKeyboard allows the user to play on a virtual keyboard using:
 * - mouse/touch presses
 * - keyboard input (TODO)
 * - MIDI input (TODO)
 */
import { SUPPORTED_NOTES } from "@/lib/notes";
import { PianoKeyboardKey } from "./PianoKeyboardKey";

type PianoKeyboardProps = {
  isVisible: boolean;
};

export const PianoKeyboard = ({ isVisible }: PianoKeyboardProps) => {
  return (
    <div
      className="flex flex-row ltr justify-start h-(--height-piano) gap-x-0.5 p-1 overflow-x-auto bg-black"
      inert={!isVisible}
      aria-hidden={!isVisible}
    >
      {SUPPORTED_NOTES.concat("D5").map((note, index) => {
        // Last white note (D5) is unsupported but we display it because it looks bad without it
        const previousNote = SUPPORTED_NOTES[index - 1];
        const isLastNote = index === SUPPORTED_NOTES.length;
        const isBlackNote = note.includes("#");
        const isAfterBlackNote = previousNote?.includes("#");

        return (
          <PianoKeyboardKey
            key={note}
            note={note}
            isLastNote={isLastNote}
            isBlackNote={isBlackNote}
            isAfterBlackNote={isAfterBlackNote}
          />
        );
      })}
    </div>
  );
};
