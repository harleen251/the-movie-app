import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SelectTrigger, SelectBackdrop, SelectContent, Select, SelectDragIndicator, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, ChevronDownIcon } from '@gluestack-ui/themed';
import axios from 'axios';
import MoviesAndTvContainer from '../containers/moviesAndTvContainer'
import { API_KEY, BASE_URL } from '../../services/apiConfig';

const Tvshows = ({ navigation }) => {
    const [tvCategory, setTvCategory] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const Tvcategories = [
        { key: 'airing_today', label: 'airing_today' },
        { key: 'on_the_air', label: 'on_the_air' },
        { key: 'popular', label: 'popular' },
        { key: 'top_rated', label: 'top_rated' }
    ];

    const fetchTvshows = async (tvcategory) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/tv/${tvcategory}?api_key=${API_KEY}`);
            setMovies(response.data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTvshows(tvCategory);
    }, [tvCategory]);

    const handleTvCategoryChange = (value) => {
        setTvCategory(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Select value={tvCategory} onValueChange={handleTvCategoryChange} style={styles.selectContainer}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="popular" />
                        <ChevronDownIcon style={styles.arrowIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {Tvcategories.map((option) => (
                                <SelectItem key={option.key} label={option.label} value={option.key} />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#021824" />
                    <Text>Loading...</Text>
                </View>
            ) : (
                <MoviesAndTvContainer movies={movies} navigation={navigation} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectContainer: {
        width: '50%',
        paddingRight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Tvshows;