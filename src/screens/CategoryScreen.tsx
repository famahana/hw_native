import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet
} from "react-native";

import CategoryCard, { Category } from "../components/Category";

const API = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function CategoryScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await fetch(`${API}/categories`);
    setCategories(await res.json());
  };

  const addCategory = async () => {
    if (!name || !icon || !color) return;

    const newCategory = {
      name,
      icon,
      bgColor: color,
      iconColor: "#2E7D32",
    };

    const res = await fetch(`${API}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    const added = await res.json();

    // Сразу показываем новую категорию
    setCategories([...categories, added]);

    setName("");
    setIcon("");
    setColor("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Screen</Text>

      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="icon"
        value={icon}
        onChangeText={setIcon}
        style={styles.input}
      />

      <TextInput
        placeholder="color"
        value={color}
        onChangeText={setColor}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={addCategory}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            selected={false}
            isDarkMode={false}
            textColor="#212121"
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginBottom: 10,
  },

  button: {
    alignSelf: "center",
    backgroundColor: "#2196F3",
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  list: {
    paddingTop: 10,
  },
});