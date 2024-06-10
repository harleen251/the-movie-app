import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, ChevronDownIcon, HStack } from '@gluestack-ui/themed';
import { fetchMoviesByCategory } from '../../services/apiConfig';
import MoviesAndTvContainer from '../containers/moviesAndTvContainer';

const Movies = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { key: 'now_playing', value: 'now_playing' },
        { key: 'popular', value: 'popular' },
        { key: 'top_rated', value: 'top_rated' },
        { key: 'upcoming', value: 'upcoming' }
    ];

    const fetchMovies = async (category) => {
        setLoading(true);
        const moviesData = await fetchMoviesByCategory(category);
        setMovies(moviesData);
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(selectedCategory);
    }, [selectedCategory]);

    const handleSearchTypeChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Select value={selectedCategory} onValueChange={handleSearchTypeChange} style={styles.select}>
                    <SelectTrigger variant="outline" size="md">
                        <SelectInput placeholder="Popular" />
                        <ChevronDownIcon style={styles.arrowIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            {categories.map((option) => (
                                <SelectItem
                                    key={option.key}
                                    label={option.value}
                                    value={option.key}
                                    style={option.key === selectedCategory ? styles.selected : null}
                                />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </View>
            {loading ? (
                <HStack>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#021824" />
                    <Text>Loading...</Text>
                </View>
                </HStack>
            ) : (
                <MoviesAndTvContainer movies={movies} navigation={navigation} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    select: {
        width: '50%',
        textAlign: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: 'green',
    },
    container: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIcon: {
        marginLeft: 8,
    },
});

export default Movies;
