import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./src/navigation/Routes";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import Bootsplash from 'react-native-bootsplash';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

function App() {

  useEffect(() => {
    Bootsplash.hide({ fade: true });
  }, [])

  return (
    <GestureHandlerRootView>
      <Routes />
    </GestureHandlerRootView>
  );
}

export default App;
