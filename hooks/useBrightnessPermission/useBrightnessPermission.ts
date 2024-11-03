import React from "react";
import * as Brightness from "expo-brightness";

export const useBrightnessPermission = () => {
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { granted } = await Brightness.getPermissionsAsync();
      if (granted) {
        setGranted(granted);
      } else {
        const { granted } = await Brightness.requestPermissionsAsync();
        setGranted(granted);
      }
    })();
  }, []);

  return { granted };
};
