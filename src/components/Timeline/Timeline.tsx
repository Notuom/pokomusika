import { trackKey } from "@/lib/utils";
import { useSongStore } from "@/stores/song";
import { TimelineTrack } from "./TimelineTrack";

export const Timeline = () => {
  const tracks = useSongStore((state) => state.tracks);

  return (
    <div className="grid grid-flow-row grid-cols-2 items-start place-items-center gap-2">
      {tracks.map((notes, index) => (
        <TimelineTrack
          key={trackKey(notes, index)}
          trackIndex={index}
          notes={notes}
        />
      ))}
    </div>
  );
};
