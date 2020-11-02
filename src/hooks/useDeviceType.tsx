import { useEffect, useState } from "react";
import { breakPointsValues, DeviceType } from "../config/break-points";

export default function useDeviceType(): DeviceType {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width < breakPointsValues.tablet) {
    return DeviceType.MOBILE;
  } else if (width < breakPointsValues.desktop) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
}
