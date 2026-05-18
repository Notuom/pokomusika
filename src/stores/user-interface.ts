import { create } from "zustand/react";

type UserInterfaceStoreState = {
  showPianoKeyboard: boolean;
};

type UserInterfaceStoreActions = {
  toggleShowPianoKeyboard: () => void;
};

type UserInterfaceStore = UserInterfaceStoreState & UserInterfaceStoreActions;

export const useUserInterfaceStore = create<UserInterfaceStore>((set) => ({
  showPianoKeyboard: true,
  toggleShowPianoKeyboard: () => {
    set((state) => ({ showPianoKeyboard: !state.showPianoKeyboard }));
  },
}));
