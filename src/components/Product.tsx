import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  categoryId?: string;
  favorite: boolean;
}

export interface Theme {
  bg: string;
  cardBg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
}

interface Props {
  product: Product;
  theme: Theme;
  onFavorite: (product: Product) => void;
}

export default function ProductCard({ product, theme, onFavorite }: Props) {
  return (
    <View style={[styles.card, {
      backgroundColor: theme.cardBg,
      borderColor: theme.border
    }]}>
      <TouchableOpacity
        style={styles.favorite}
        onPress={() => onFavorite(product)}
      >
        <Ionicons
          name={product.favorite ? "heart" : "heart-outline"}
          size={20}
          color={product.favorite ? "red" : "#bdbdbd"}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text
        style={[styles.title, { color: theme.textPrimary }]}
        numberOfLines={1}
      >
        {product.title}
      </Text>

      <Text style={[styles.price, { color: theme.textPrimary }]}>
        {product.price}{" "}
        <Text style={[styles.unit, { color: theme.textSecondary }]}>
          {product.unit}
        </Text>
      </Text>

      <View style={styles.footer}>
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#FFB300" />

          <Text style={{ color: theme.textPrimary }}>
            {product.rating}{" "}
            <Text style={styles.reviews}>({product.reviews})</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.add}>
          <Ionicons name="cart-outline" size={16} color="white" />
          <Text style={styles.addText}>Додати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
  },

  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },

  image: {
    width: "100%",
    height: 90,
    marginVertical: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  unit: {
    fontSize: 12,
    fontWeight: "normal",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  reviews: {
    fontSize: 11,
    color: "#9E9E9E",
  },

  add: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },

  addText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },
});