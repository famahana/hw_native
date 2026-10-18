import React from "react";
import { FlatList, View, StyleSheet, useWindowDimensions } from "react-native";
import ProductCard, { Product, Theme } from "./Product";

interface Props {
  products: Product[];
  theme: Theme;
  onFavorite: (product: Product) => void;
}

export default function ProductList({ products, theme, onFavorite }: Props) {
  const { width, height } = useWindowDimensions();

  const tablet = Math.min(width, height) >= 600;
  const portrait = height >= width;

  const columns = tablet ? (portrait ? 2 : 3) : portrait ? 1 : 2;
  const itemWidth = columns === 1 ? "100%" : columns === 2 ? "48%" : "31%";

  return (
    <FlatList
      key={columns}
      data={products}
      numColumns={columns}
      scrollEnabled={false}
      keyExtractor={(item) => String(item.id)}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <View style={{ width: itemWidth, marginBottom: 16 }}>
          <ProductCard
            product={item}
            theme={theme}
            onFavorite={onFavorite}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
});