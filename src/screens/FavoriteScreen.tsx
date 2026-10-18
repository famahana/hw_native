import React from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductList from "../components/ProductList";
import { Product, Theme } from "../components/Product";

interface Props {
  products: Product[];
  theme: Theme;
  onFavorite: (product: Product) => void;
  onBack: () => void;
}

export default function FavoritesScreen({
  products,
  theme,
  onFavorite,
  onBack,
}: Props) {
  const favoriteProducts = products.filter(product => product.favorite);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons
                name="arrow-back"
                size={24}
                color="#2E7D32"
            />
        </TouchableOpacity>

        <View>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Обране ❤️
          </Text>

          <Text style={{ color: theme.textSecondary }}>
            Товари, які ви зберегли
          </Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Ionicons name="heart-circle" size={42} color="#EF5350" />

        <View>
          <Text style={styles.bannerTitle}>
            У вас {favoriteProducts.length} обраних товарів
          </Text>

          <Text style={styles.bannerText}>
            Натисніть на серце, щоб видалити товар
          </Text>
        </View>
      </View>

      {favoriteProducts.length === 0 ? (
        <Text style={[styles.empty, { color: theme.textSecondary }]}>
          Обраних товарів поки немає
        </Text>
      ) : (
        <ProductList
          products={favoriteProducts}
          theme={theme}
          onFavorite={onFavorite}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
  },

  bannerTitle: {
    fontWeight: "bold",
    color: "#2E7D32",
  },

  bannerText: {
    fontSize: 12,
    color: "#66A86B",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  backButton: {
  padding: 8,
},
});