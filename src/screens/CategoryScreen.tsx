
import { View,Text,StyleSheet, TextInput,Button } from "react-native";
import CategoryType from "../types/CategoryType";
import { useState } from "react";

const styles = StyleSheet.create({
    container:{
        flexGrow: 0,
        alignItems: "center",


    },
    text:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    input:{
        borderColor: "black",
        borderWidth: 1,
        width: "80%",

    }
});

export default function CategoryScreen() {
    const URL:string = "http://192.168.100.36:3000/categories"
    const [category,setCategory] = useState<CategoryType>({
        name:"",
        image:"",
        color:""

    })
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Category Screen</Text>
            <TextInput value={category.name} style={styles.input} placeholder="name" onChangeText={(text)=>{
                setCategory({...category,name:text})
            }}/>
            <TextInput value={category.image} style={styles.input} placeholder="image" onChangeText={(text)=>{
                setCategory({...category,image:text})
            }}/>
            <TextInput keyboardType="phone-pad"   value={category.color} style={styles.input} placeholder="color" onChangeText={(text)=>{
                setCategory({...category,color:text})
            }}/>
            <Button title="Add Category" onPress={()=>{
                console.log("Push");
                fetch(URL,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(category)}).then().catch((err)=>console.log(err))
            }}/>
            <Text >{category.name}</Text>
            <Text >{category.image}</Text>
            <Text >{category.color}</Text>
        </View>
    )
}