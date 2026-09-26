import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
}

interface Theme {
  cardBg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
}

interface ProductCardProps {
  product: Product;
  theme: Theme;
}

export default function ProductCard({ product, theme }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <View
      style={[
        styles.productCard,
        { backgroundColor: theme.cardBg, borderColor: theme.border },
      ]}
    >
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons
          name="heart-outline"
          size={20}
          color={isFavorite ? "#ff0000" : "#bdbdbd"}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="contain"
      />

      <Text
        style={[styles.productTitle, { color: theme.textPrimary }]}
        numberOfLines={1}
      >
        {product.title}
      </Text>
      <Text style={[styles.productPrice, { color: theme.textPrimary }]}>
        {product.price}{" "}
        <Text style={[styles.productUnit, { color: theme.textSecondary }]}>
          {product.unit}
        </Text>
      </Text>

      <View style={styles.productFooter}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFB300" />
          <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
            {product.rating}{" "}
            <Text style={styles.reviewsText}>({product.reviews})</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Додати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    position: "relative",
    borderWidth: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 90,
    marginVertical: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productUnit: {
    fontSize: 12,
    fontWeight: "normal",
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 11,
    color: "#9E9E9E",
    fontWeight: "normal",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
});