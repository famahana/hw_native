import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View,Platform } from "react-native";
import MyFlatList from "./src/ui/MyFlatList";
import { BasicComponents } from "./src/ui/BasicComponents";
import { Inputs } from "./src/ui/Inputs";
import { MyKeyboard } from "./src/ui/MyKeybord";
import { LayoutExample } from "./src/ui/LayoutExample";
import CategoryScreen from "./src/screens/CategoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TestScreen from "./src/screens/TestScreen";
import { SafeAreaProvider,useSafeAreaInsets} from "react-native-safe-area-context";



export default function App() {
  console.log(Platform.OS)
  
  return (
    // <LayoutExample />
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <CategoryScreen/> */}
        {/* <TestScreen/> */}
        <HomeScreen/>
        {/* <ImageBackground
          source={{ uri: "https://picsum.photos/800/600" }}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Text style={styles.text}>
            Ласкаво прошу до нашого додатку на React Native!
          </Text>
          <CategoryScreen/>
          <Inputs/> 
          <MyKeyboard/> 
          <MyFlatList />
          <StatusBar style="auto" />
        </ImageBackground> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7cf0b0",
    justifyContent: "center", // центрує вміст по вертикалі
  },
  text: {
    textAlign: "center", // центрує текст залежно від ширини екрана
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    flexGrow: 0, // не дає FlatList займати весь вертикальний екран
    marginVertical: 20, //відступ зверху та знизу
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center", // центрує елементи FlatList по горизонталі
    alignItems: "center", // центрує елементи FlatList по вертикалі
    borderWidth: 1, // додає рамку навколо FlatList
    borderColor: "black",
  },
  item: {
    marginHorizontal: 10,
  },
});
// import { StatusBar } from "expo-status-bar";
// import {
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   useWindowDimensions,
// } from "react-native";
// import { Inputs } from "./src/ui/Inputs";
// import { MyKeyboard } from "./src/ui/MyKeybord";
// import CategoryScreen from "./src/screens/CategoryScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// const cl = console.log;
// export default function App() {
//   //const {(width, height)} = Dimensions.get("window"); const{" "}
//   const { width, height } = useWindowDimensions();
//   cl(`${width} ${height}`);
 
//   return (
//     <SafeAreaProvider>
//       <View style={styles.container}>
//         <StatusBar style="auto" />
//         <View style={[styles.item,{backgroundColor:"green"}]}></View>
//         <View style={[styles.item,{backgroundColor:"red"}]}></View>
//         <View style={[styles.item,{backgroundColor:"blue"}]}></View>
//         <View style={[styles.item, {backgroundColor:"purple"}]}></View>
//       </View>
//     </SafeAreaProvider>
//   );
// }
 
// const styles = StyleSheet.create({
//   container:
//   {
//     flexDirection:"row",
//     flex:1,
//     width:"100%",
//     height:"100%",
//     justifyContent:"space-between",
//     backgroundColor:"orange",
//     alignContent:"center",
//     flexWrap:"wrap"
//   },
//   item:{
//     height:"10%",
//     width:"15%",
//   }

  
// });