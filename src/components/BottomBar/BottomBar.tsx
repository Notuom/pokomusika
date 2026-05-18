import clsx from "clsx";
import {
  FaDeleteLeft,
  FaEye,
  FaEyeSlash,
  FaKeyboard,
  FaPause,
  FaPlay,
  FaQuoteRight,
  FaRegKeyboard,
  FaStop,
  FaTrash,
} from "react-icons/fa6";
import { useAudio } from "@/stores/audio";
import { useSongStore } from "@/stores/song";
import { useUserInterfaceStore } from "@/stores/user-interface";
import { PianoKeyboard } from "../PianoKeyboard/PianoKeyboard";
import { BottomBarButton } from "./BottomBarButton";

/**
 * BottomBar contains the playback and input controls.
 * It can be collapsed or expanded and sticks to the bottom of the screen.
 */
export const BottomBar = () => {
  const audio = useAudio();
  const { showPianoKeyboard, toggleShowPianoKeyboard } =
    useUserInterfaceStore();
  const {
    isPlaying,
    setIsPlaying,
    addOrReplaceSelectedNote,
    deleteSelectedNote,
    empty,
    tracks,
    setPlayheadIndex,
  } = useSongStore(); // TODO optimize?

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
            onClick={() => {
              deleteSelectedNote();
            }}
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
            onClick={() => {
              if (!isPlaying) {
                audio?.playSong(
                  tracks,
                  (index) => {
                    setPlayheadIndex(index);
                  },
                  () => {
                    setIsPlaying(false);
                    setPlayheadIndex(-1);
                  },
                );
                setIsPlaying(true);
              } else {
                audio?.pause();
                setIsPlaying(false);
              }
            }}
          />
          <BottomBarButton
            label="Stop"
            Icon={FaStop}
            onClick={() => {
              audio?.stop();
              setIsPlaying(false);
              setPlayheadIndex(-1);
            }}
          />
          <BottomBarButton
            label="Delete Song"
            Icon={FaTrash}
            onClick={() => {
              empty();
              audio?.stop();
              setIsPlaying(false);
              setPlayheadIndex(-1);
            }}
          />
          <BottomBarButton
            label={
              showPianoKeyboard ? "Hide Piano Keyboard" : "Show Piano Keyboard"
            }
            Icon={showPianoKeyboard ? FaRegKeyboard : FaKeyboard}
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
