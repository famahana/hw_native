import { View,Text,Button } from "react-native"
import { UserCounterStore } from "../store/useCounterStore";

const CounterView = ()=>{
    const counter = UserCounterStore((state)=>state.count);
    return (
        <View> 
            <Text>CounterView{counter}</Text>
        </View>
    )
}
export default CounterView