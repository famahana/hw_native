import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet, Text, View, ScrollView, TextInput, Image,
  TouchableOpacity, ActivityIndicator, StatusBar, Switch,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import { Product } from "../components/Product";
import { Category } from "../components/Category";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`),
      ]);

      if (!categoriesRes.ok || !productsRes.ok)
        throw new Error("Не вдалося завантажити дані");

      setCategories(await categoriesRes.json());
      setProducts(await productsRes.json());
    } catch (err) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const category =
        !selectedCategoryId ||
        String(product.categoryId) === String(selectedCategoryId);

      const search = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return category && search;
    });
  }, [products, selectedCategoryId, searchQuery]);

  const theme = {
    bg: isDarkMode ? "#121212" : "#FFFFFF",
    cardBg: isDarkMode ? "#1E1E1E" : "#FAFAFA",
    textPrimary: isDarkMode ? "#FFFFFF" : "#212121",
    textSecondary: isDarkMode ? "#A0A0A0" : "#757575",
    inputBg: isDarkMode ? "#2C2C2C" : "#F5F5F5",
    border: isDarkMode ? "#2C2C2C" : "#F0F0F0",
    bannerBg: isDarkMode ? "#1B382B" : "#E8F5E9",
    bannerTitle: isDarkMode ? "#A5D6A7" : "#1B5E20",
    bannerSubtitle: isDarkMode ? "#81C784" : "#4CAF50",
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Завантаження даних...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}>
        <Ionicons name="alert-circle-outline" size={48} color="#D32F2F" />
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Спробувати знову</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const productsTitle = selectedCategoryId
    ? categories.find((c) => String(c.id) === String(selectedCategoryId))?.name || "Товари"
    : "Популярні товари";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
              Привіт, Максим 👋
            </Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textSecondary }]}>
              Раді бачити тебе знову!
            </Text>
          </View>

          <View style={styles.headerActions}>
            <View style={styles.themeToggle}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={20}
                color={isDarkMode ? "#FFD54F" : "#FFA000"}
              />
              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>

            <TouchableOpacity
              style={[styles.notificationButton, { backgroundColor: theme.inputBg }]}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={theme.textPrimary}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.search, { backgroundColor: theme.inputBg }]}>
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />

          <TextInput
            placeholder="Пошук товарів..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary }]}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        {/* Banner */}
        <View style={[styles.banner, { backgroundColor: theme.bannerBg }]}>
          <View style={styles.bannerContent}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>Знижки до 50%</Text>
            </View>

            <Text style={[styles.bannerTitle, { color: theme.bannerTitle }]}>
              Свіжі продукти{"\n"}для вашого столу
            </Text>

            <Text style={[styles.bannerSubtitle, { color: theme.bannerSubtitle }]}>
              Овочі, фрукти, молочні продукти та багато іншого
            </Text>

            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Перейти</Text>
              <Ionicons name="arrow-forward" size={16} color="#1B5E20" />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3137/3137044.png" }}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Категорії
        </Text>

        <CategoryList
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          isDarkMode={isDarkMode}
          textColor={theme.textPrimary}
        />

        {/* Products */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {productsTitle}
          </Text>

          <Text style={{ color: theme.textSecondary }}>
            ({filteredProducts.length})
          </Text>
        </View>

        <ProductList products={filteredProducts} theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 16, paddingBottom: 32 },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: { marginTop: 12, fontSize: 16 },
  errorText: { marginTop: 12, fontSize: 16, color: "#D32F2F" },

  retryButton: {
    marginTop: 16,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: { color: "white", fontWeight: "bold" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },

  greetingTitle: { fontSize: 20, fontWeight: "bold" },
  greetingSubtitle: { fontSize: 14, marginTop: 2 },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    width: 16,
    height: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },

  searchInput: { flex: 1, fontSize: 14 },

  banner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },

  bannerContent: { flex: 1 },

  discountTag: {
    alignSelf: "flex-start",
    backgroundColor: "#2E7D32",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },

  discountText: { color: "white", fontSize: 11, fontWeight: "bold" },
  bannerTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  bannerSubtitle: { fontSize: 12, marginBottom: 12 },

  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },

  bannerButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1B5E20",
    marginRight: 4,
  },

  bannerImage: { width: 110, height: 110, marginLeft: 8 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});