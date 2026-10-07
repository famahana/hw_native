

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface CategoryProps {
  category: Category;
  selected: boolean;
  onPress: () => void;
  isDarkMode: boolean;
  textColor: string;
}

export default function CategoryCard({
  category,
  selected,
  onPress,
  isDarkMode,
  textColor,
}: CategoryProps) {
  return (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={onPress}
    >
      <View
        style={[
          styles.categoryIconContainer,
          {
            backgroundColor: selected
              ? "#2E7D32"
              : isDarkMode
                ? "#2C2C2C"
                : category.bgColor,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={category.icon as any}
          size={32}
          color={
            selected
              ? "#FFFFFF"
              : category.iconColor
          }
        />
      </View>

      <Text
        style={[
          styles.categoryName,
          {
            color: selected
              ? "#2E7D32"
              : textColor,

            fontWeight: selected
              ? "bold"
              : "normal",
          },
        ]}
        numberOfLines={2}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 72,
  },

  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 8,
  },

  categoryName: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
});