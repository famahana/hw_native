import React from "react";

import {
  FlatList,
  StyleSheet,
} from "react-native";

import CategoryCard, {
  Category,
} from "./Category";

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | null;

  onSelectCategory: (
    id: string | null
  ) => void;

  isDarkMode: boolean;
  textColor: string;
}

export default function CategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
  isDarkMode,
  textColor,
}: CategoryListProps) {
  const allCategory: Category = {
    id: "all",
    name: "Всі",
    icon: "apps",
    bgColor: "#E8F5E9",
    iconColor: "#2E7D32",
  };

  const data = [
    allCategory,
    ...categories,
  ];

  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) =>
        item.id.toString()
      }
      contentContainerStyle={
        styles.categoriesList
      }
      renderItem={({ item }) => {
        const isAll =
          item.id === "all";

        const selected = isAll
          ? selectedCategoryId === null
          : String(selectedCategoryId) ===
            String(item.id);

        return (
          <CategoryCard
            category={item}
            selected={selected}
            isDarkMode={isDarkMode}
            textColor={textColor}
            onPress={() => {
              if (isAll) {
                onSelectCategory(null);
              } else {
                onSelectCategory(item.id);
              }
            }}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  categoriesList: {
    paddingBottom: 16,
  },
});