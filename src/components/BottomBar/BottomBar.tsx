import clsx from "clsx";
import {
  FaDeleteLeft,
  FaEye,
  FaEyeSlash,
  FaPause,
  FaPlay,
  FaQuoteRight,
  FaStop,
} from "react-icons/fa6";
import { useSongStore } from "@/stores/song";
import { useUserInterfaceStore } from "@/stores/user-interface";
import { PianoKeyboard } from "../PianoKeyboard/PianoKeyboard";
import { BottomBarButton } from "./BottomBarButton";

/**
 * BottomBar contains the playback and input controls.
 * It can be collapsed or expanded and sticks to the bottom of the screen.
 */
export const BottomBar = () => {
  const { showPianoKeyboard, toggleShowPianoKeyboard } =
    useUserInterfaceStore();
  const { isPlaying, toggleIsPlaying, addOrReplaceSelectedNote } =
    useSongStore(); // TODO optimize?

  return (
    <div className="fixed flex-col flex w-full inset-s-0 inset-e-0 bottom-safe-area">
      <div
        className={clsx(
          "transition-transform",
          showPianoKeyboard ? "translate-none" : "translate-y-32",
        )}
      >
        <div className="flex justify-center gap-1 w-full">
          <BottomBarButton
            label="Delete Note"
            Icon={FaDeleteLeft}
            onClick={() => {}}
          />
          <BottomBarButton
            label="Insert Break"
            Icon={FaQuoteRight}
            onClick={() => {
              addOrReplaceSelectedNote({ type: "break" });
            }}
          />
          <BottomBarButton
            label={
              showPianoKeyboard ? "Hide Piano Keyboard" : "Show Piano Keyboard"
            }
            Icon={isPlaying ? FaPause : FaPlay}
            onClick={toggleIsPlaying}
          />
          <BottomBarButton label="Stop" Icon={FaStop} onClick={() => {}} />
          <BottomBarButton
            label={
              showPianoKeyboard ? "Hide Piano Keyboard" : "Show Piano Keyboard"
            }
            Icon={showPianoKeyboard ? FaEyeSlash : FaEye}
            onClick={toggleShowPianoKeyboard}
          />
        </div>
        <div className="flex justify-center w-full bg-black">
          <PianoKeyboard isVisible={showPianoKeyboard} />
        </div>
      </div>
    </div>
  );
};
