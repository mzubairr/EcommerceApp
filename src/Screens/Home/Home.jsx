import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from '../../constants/imagePath'
import styles from './homeStyles'
import Colors from '../../constants/colors'
import { useEffect, useRef, useState } from 'react'
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import axios from 'axios'
import ProductCard from '../../components/ProductCard'
import { addFavorite, removeFavorite, listenToFavorites } from '../../Services/Firebase/db'
import { Bell, ScanSearch, Search } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'

const Home = ({ navigation }) => {

  const data = [...new Array(6).keys()];
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);

  const toggleFavorite = (productId) => {
    const isFav = favoriteIds.includes(productId);

    if (isFav) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  useEffect(() => {

    const getCategory = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        const limitedCategories = response.data.filter((item) => categoryItems.hasOwnProperty(item.slug));
        setCategory(limitedCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCategoryLoading(false);
      }
    }

    const getProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductLoading(false);
      }
    }

    getCategory();
    getProducts();

    const unsubscribe = listenToFavorites(setFavoriteIds);

    return () => unsubscribe();
  }, [])

  const categoryItems = {
    "womens-dresses": imagePath.dress,
    "sports-accessories": imagePath.gym,
    "furniture": imagePath.sofa,
    "tablets": imagePath.gamingPad,
    "stationery": imagePath.stationery,
    "beauty": imagePath.lipstick
  }

  const carouselData = [
    {
      image: imagePath.carousel1
    },
    {
      image: imagePath.carousel1
    },
    {
      image: imagePath.carousel1
    },
    {
      image: imagePath.carousel1
    },
    {
      image: imagePath.carousel1
    }
  ]

  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  // Agar koi bhi loading ho to spinner dikhao
  if (isCategoryLoading || isProductLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.btnBg} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        columnWrapperStyle={styles.columnSeparate}
        numColumns={2}
        data={products}
        keyExtractor={(item, _) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.topHeader}>
              <View style={styles.userLocation}>
                <Text style={[styles.locationText, styles.locationHeading]}>Location</Text>
                <Text style={styles.locationText}>Karachi,Pakistan</Text>
              </View>
              <Bell size={moderateScale(24)} color="#000" />
            </View>
            <View style={styles.searchBarContainer}>
              <Search size={moderateScale(24)} color="#000" />
              <Text onPress={() => navigation.navigate("BrowseProduct")} style={styles.searchBar}>Find your favorite items</Text>
              <ScanSearch size={moderateScale(24)} color={Colors.placeholder} />
            </View>
            <View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeading}>Categories</Text>
                <Text style={styles.viewText}>View All</Text>
              </View>
              <FlatList
                contentContainerStyle={styles.categoryList}
                data={category}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate("Category", {
                    category: item.slug,
                  })} style={styles.categoryItem}>
                    <View style={styles.categoryImgContainer}>
                      <Image
                        style={styles.categoryImage}
                        source={categoryItems[item.slug]}
                        resizeMode='cover'
                      />
                    </View>
                    <Text style={styles.categoryText}>
                      {item.name.length > 7 ? item.name.slice(0, 7) + '..' : item.name}
                    </Text>
                  </TouchableOpacity>
                )} />
            </View>
            <View
              style={styles.carouselContainer}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
              }}
            >
              {containerWidth > 0 && (
                <Carousel
                  style={{ borderRadius: 20 }}
                  ref={ref}
                  width={containerWidth}
                  height={containerWidth / 2}
                  data={carouselData}
                  autoPlay={true}
                  autoPlayInterval={3000}
                  loop={true}
                  onProgressChange={progress}
                  renderItem={({ item }) => (
                    <Image
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                      resizeMode='cover'
                      source={item.image}
                    />
                  )}
                />
              )}
              <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: Colors.lightGray, borderRadius: 50 }}
                activeDotStyle={{ backgroundColor: Colors.btnBg }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
              />
            </View>
            <View style={styles.hotDealSec}>
              <Text style={styles.hotDeal}>Hot Deals</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            favoriteIds={favoriteIds}
            handleFavorite={() => toggleFavorite(item.id)}
            onPress={() =>
              navigation.navigate("ProductDetails", { ProductId: item.id })}
            item={item} />
        )}
      />
    </SafeAreaView>
  )
}

export default Home