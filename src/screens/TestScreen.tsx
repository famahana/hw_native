import { View,Dimensions,Text,useWindowDimensions,StyleSheet } from "react-native";


const TestScreen = () =>{
    // const {width,height} = Dimensions.get("window")
    const {width,height} = useWindowDimensions();
    return(
        <View>
            <Text style={styles.container}>Width:{width} Height:{height}</Text>

        </View>
    )
}
const styles = StyleSheet.create({
        container:{
            backgroundColor:"orange"
        }
    })
export default TestScreen