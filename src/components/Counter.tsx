import { View,Text,Button } from "react-native"
import { UserCounterStore } from "../store/useCounterStore";

const Counter = ()=>{
    const counter = UserCounterStore((state)=>state.count);
    const upHandler = UserCounterStore((state)=>state.up);
    const downHandler = UserCounterStore((state)=>state.down);
    const resetHandler = UserCounterStore((state)=>state.reset)
    return (
        <View>
            <Button title="Up" onPress={upHandler}></Button>
            <Text>{counter}</Text>
            <Button title="Down" onPress={downHandler}></Button>
            <Button title="Reset" onPress={resetHandler}></Button>
            
        </View>
    )
}
export default Counter