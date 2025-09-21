import { View, Image, TextInput, TouchableOpacity, Text, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import imagePath from '../../../constants/imagePath'
import styles from './browseProductStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import Colors from '../../../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChevronLeft, CircleX, ScanSearch, Search } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'

export default function BrowseProduct({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [focused, setFocused] = useState(false);
    const [popularSearch, setPopularSearch] = useState([]);

    const getBorderColor = () => {
        if (focused) return { borderColor: Colors.btnBg };
        return { borderColor: Colors.border };
    };

    const capitalizeWords = (str) => {
        if (!str) return '';
        str = str.trim().toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const searchProduct = async () => {
        setFocused(!focused)

        const capitalizedSearchQuery = capitalizeWords(searchQuery);
        if (!capitalizedSearchQuery) return;

        // Store the last search query in AsyncStorage
        const lastSearch = await AsyncStorage.getItem('lastSearch');
        const parsedLastSearch = JSON.parse(lastSearch) || [];

        if (parsedLastSearch.length > 0) {
            // Check if the search query already exists in the last search
            const existingSearch = parsedLastSearch.findIndex(item => item.query === capitalizedSearchQuery);
            if (existingSearch !== -1) {
                if (parsedLastSearch[existingSearch].count < 3) {
                    parsedLastSearch[existingSearch].count += 1;
                } else {
                    const lastSearch = await AsyncStorage.getItem('lastSearch');
                    const parsedLastSearch = JSON.parse(lastSearch);
                    const popularSearch = parsedLastSearch.filter(item => item.count === 3);
                    setPopularSearch(popularSearch);
                }
            } else {
                const popularSearch = { query: capitalizedSearchQuery, count: 1 };
                parsedLastSearch.push(popularSearch);
            }
            await AsyncStorage.setItem('lastSearch', JSON.stringify(parsedLastSearch));

        } else {
            const popularSearch = { query: capitalizedSearchQuery, count: 1 };
            parsedLastSearch.push(popularSearch);
            await AsyncStorage.setItem('lastSearch', JSON.stringify(parsedLastSearch));
        }

        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${capitalizedSearchQuery}`);
            if (response.data.products.length > 0) {
                navigation.navigate('Category', { category: response?.data?.products[0]?.category, results: response.data.products });
                setNotFound(false);
            } else {
                setNotFound(true);
            }
            return null;
        } catch (error) {
            console.log('Error fetching search results:', error);
        }
    }

    const removeAllPopularSearch = async () => {
        setPopularSearch([]);
        await AsyncStorage.removeItem('lastSearch');
    };

    const removePopularSearch = async (index) => {
        const updatedPopularSearch = popularSearch.filter((_, i) => i !== index);
        setPopularSearch(updatedPopularSearch);
        await AsyncStorage.setItem('lastSearch', JSON.stringify(updatedPopularSearch));
    };

    const fetchLastSearch = async () => {
        const lastSearch = await AsyncStorage.getItem('lastSearch');
        const parsedLastSearch = JSON.parse(lastSearch);

        if (parsedLastSearch.length > 0) {
            const popularSearch = parsedLastSearch.filter(item => item.count === 3);
            setPopularSearch(popularSearch);
        }
    };

    useEffect(() => {
        fetchLastSearch();
    }, []);


    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ChevronLeft size={moderateScale(24)} color="#000" />
            </TouchableOpacity>
            <View style={[styles.searchBarContainer, getBorderColor()]}>
                <Search size={moderateScale(24)} color="#000" />
                <TextInput
                    autoFocus
                    autoCapitalize='none'
                    onSubmitEditing={() => searchProduct()}
                    keyboardType='web-search'
                    value={searchQuery}
                    onFocus={() => setFocused(!focused)}
                    onChangeText={text => setSearchQuery(text)}
                    style={styles.searchBar}
                    placeholder='Find your favorite items'
                    placeholderTextColor={styles.placeholder}
                />
                {searchQuery.length > 0
                    ?
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <CircleX size={moderateScale(24)} color="#000" />
                    </TouchableOpacity>
                    :
                    <ScanSearch size={moderateScale(24)} color="#000" />
                }
            </View>
            <View style={{ flex: 1 }}>
                {!notFound && (
                    <>
                        <View style={styles.popularSearchesContainer}>
                            <Text style={styles.popularSearchesHeading}>Popular Searches</Text>

                            {popularSearch.length > 0 &&
                                <Pressable onPress={removeAllPopularSearch} style={styles.clearAllText}>
                                    <Text>Clear All</Text>
                                </Pressable>
                            }
                        </View>

                        {popularSearch.length > 0 &&
                            <FlatList
                                contentContainerStyle={styles.popularSearch}
                                data={popularSearch}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => setSearchQuery(item.query)} style={styles.queries}>
                                        <Text style={styles.queryText}>{item.query}</Text>
                                        <Pressable onPress={() => removePopularSearch(index)}>
                                            <CircleX size={moderateScale(24)} color={Colors.inActiveBorder} />
                                        </Pressable>
                                    </TouchableOpacity>
                                )}
                            />
                        }
                    </>
                )}

                {
                    notFound && (
                        <View style={styles.noResultsContainer}>
                            <Image
                                style={styles.searchImg}
                                source={imagePath.searchImg}
                                resizeMode="cover"

                            />
                            <Text style={styles.noResultsText}>No results found!</Text>
                        </View>
                    )
                }
            </View>
        </SafeAreaView >
    )
}