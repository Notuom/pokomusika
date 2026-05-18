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
      className="inline-flex justify-center items-center size-(--size-bottom-bar-button) bg-button-background"
      aria-label={label}
      type="button"
      onClick={onClick}
    >
      {<Icon className="size-8" />}
    </button>
  );
};
