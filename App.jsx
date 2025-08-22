import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "./src/navigation/Routes";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { signOutUser } from "./src/Services/Firebase/auth";

function App() {

  useEffect(() => {
    const clearAsyncstorage = async () => {
      await AsyncStorage.clear()
    }
    clearAsyncstorage() 
  }, [])

  return (
    <GestureHandlerRootView>
      <Routes />
    </GestureHandlerRootView>
  );
}

export default App;
