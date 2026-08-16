import type { IconType } from "react-icons";

export type BottomBarButtonProps = {
  label: string;
  Icon: IconType;
  onClick: () => void;
};

/**
 * Base bottom bar button
 */
export const BottomBarButton = ({
  Icon,
  label,
  onClick,
}: BottomBarButtonProps) => {
  return (
    <button
      className="flex justify-center items-center size-(--size-bottom-bar-button) rounded-xl bg-bottom-bar-button-background text-bottom-bar-button-icon"
      aria-label={label}
      type="button"
      onClick={onClick}
    >
      {<Icon className="size-6" />}
    </button>
  );
};
