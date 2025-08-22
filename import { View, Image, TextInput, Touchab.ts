import { View, Image, TextInput, TouchableOpacity, Text, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import imagePath from '../../../constants/imagePath'
import styles from './browseProductStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import Colors from '../../../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        const parsedLastSearch = await JSON.parse(lastSearch) || [];
        setPopularSearch(prev => [...prev, capitalizedSearchQuery]);

        if (parsedLastSearch.length > 0) {
            const popularSearch = [...parsedLastSearch, capitalizedSearchQuery];
            await AsyncStorage.setItem('lastSearch', JSON.stringify(popularSearch));
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

    const removePopularSearch = async (index) => {
        const updatedPopularSearch = popularSearch.filter((_, i) => i !== index);
        setPopularSearch(updatedPopularSearch);
        await AsyncStorage.setItem('lastSearch', JSON.stringify(updatedPopularSearch));
    };

    const fetchLastSearch = async () => {
        const lastSearch = await AsyncStorage.getItem('lastSearch');
        const parsedLastSearch = await JSON.parse(lastSearch);
        if (parsedLastSearch.length > 0) {
            setPopularSearch([...parsedLastSearch]);
        }
    };

    useEffect(() => {
        fetchLastSearch();
    }, []);


    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image
                    style={styles.arrowIcon}
                    source={imagePath.arrowLeft}
                />
            </TouchableOpacity>
            <View style={[styles.searchBarContainer, getBorderColor()]}>
                <Image
                    style={styles.bellIcon}
                    source={imagePath.searchIcon}
                />
                <TextInput
                    autoCapitalize='not'
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
                        <Image
                            style={styles.cancelIcon}
                            source={imagePath.cancelCircleDark}
                        />
                    </TouchableOpacity>
                    :
                    <Image
                        style={styles.bellIcon}
                        source={imagePath.searchVisualIcon}
                    />
                }
            </View>
            <View style={{ flex: 1 }}>
                {!notFound && (
                    <>
                        <View style={styles.popularSearchesContainer}>
                            <Text style={styles.popularSearchesHeading}>Popular Searches</Text>
                            <Text style={styles.clearAllText}>Clear All</Text>
                        </View>

                        {popularSearch.length > 0 &&
                            <FlatList
                                data={popularSearch}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View>
                                        <View style={styles.queries}>
                                            <Text style={styles.queryText}>{item}</Text>
                                            <Pressable onPress={() => removePopularSearch(index)}>
                                                <Image
                                                    style={styles.cancelIcon}
                                                    source={imagePath.cancelCircle}
                                                />
                                            </Pressable>
                                        </View>
                                    </View>
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