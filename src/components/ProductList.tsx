
import {
  FlatList,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import ProductCard, {
  Product,
  Theme,
} from "./Product";

interface ProductListProps {
  products: Product[];
  theme: Theme;
}

export default function ProductList({
  products,
  theme,
}: ProductListProps) {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;
  const isTablet = Math.min(width, height) >= 600;

  let columns = 1;

  if (isTablet) {
    columns = isPortrait ? 2 : 3;
  } else {
    columns = isPortrait ? 1 : 2;
  }

  const getItemWidth = () => {
    if (columns === 1) {
      return "100%";
    }

    if (columns === 2) {
      return "48%";
    }

    return "31%";
  };

  return (
    <FlatList
      key={`products-${columns}`}
      data={products}
      numColumns={columns}
      scrollEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      columnWrapperStyle={
        columns > 1
          ? styles.columnWrapper
          : undefined
      }
      renderItem={({ item }) => (
        <View
          style={[
            styles.item,
            { width: getItemWidth() },
          ]}
        >
          <ProductCard
            product={item}
            theme={theme}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  item: {
    marginBottom: 16,
  },
});