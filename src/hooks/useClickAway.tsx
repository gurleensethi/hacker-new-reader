import React, { useEffect } from "react";

export default function useClickAway(
  rootRef: React.RefObject<any>,
  onClickAway: () => void,
  isActive: boolean = false
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef && rootRef.current?.contains(e.target as any)) {
        return;
      }
      onClickAway();
    }

    if (isActive) {
      document.addEventListener("mousedown", handleClick, false);
      return () =>
        document.removeEventListener("mousedown", handleClick, false);
    }
  }, [rootRef, onClickAway, isActive]);
}
