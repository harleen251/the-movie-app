// Search.js

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, ButtonIcon, ButtonText, HStack, Icon, Input, InputField, InputIcon, VStack } from '@gluestack-ui/themed';
import { FormControl, FormControlLabelText } from '@gluestack-ui/themed';
import { SearchIcon } from '@gluestack-ui/themed';
import { searchContent } from '../../services/apiConfig';
import MoviesAndTvContainer from '../containers/moviesAndTvContainer';
import SelectSearchCategory from './SearchSelectCategory';
const Search = ({ navigation }) => {
  const [searchCategory, setSearchCategory] = useState('movie');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [startSearching, setStartSearching] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { key: 'Movie', value: 'movie' },
    { key: 'TV Show', value: 'tv' },
    { key: 'Multi', value: 'multi' },
  ];

  useEffect(() => {
    if (search) {
      fetchSearchResults();
    }
  }, [searchCategory]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const searchResults = await searchContent(searchCategory, search);
      setMovies(searchResults);
    } catch (error) {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setStartSearching(true);
    fetchSearchResults();
  };

  const handleSearchTypeChange = (value) => {
    setSearchCategory(value);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <VStack space={20} width="100%">
          <FormControl isRequired>
            <FormControl.Label>
              <FormControlLabelText>
                Search Movie/TV Show Name
              </FormControlLabelText>
            </FormControl.Label>
            <HStack width="100%" space={2} alignItems="center">
              <Input width="80%" flexDirection="row" alignItems="center">
                <InputIcon>
                  <Icon as={SearchIcon} size="sm" />
                </InputIcon>
                <InputField
                  placeholder="i.e. James Bond, CSI"
                  value={search}
                  onChangeText={setSearch}
                  style={{ flex: 1 }}
                />
              </Input>
            </HStack>
            <FormControl.Label>
              <FormControlLabelText>Choose Search Type</FormControlLabelText>
            </FormControl.Label>
            <HStack space={2} alignItems="center" justifyContent="center">
              <SelectSearchCategory
                value={searchCategory}
                onValueChange={handleSearchTypeChange}
                categories={categories}
              />
              <View style={styles.spacer} />
              <Button
                onPress={handleSearch}
                style={[styles.search, styles.selectedButton]}
              >
                <ButtonIcon as={SearchIcon} mr="$2" />
                <ButtonText>Search</ButtonText>
              </Button>
            </HStack>
          </FormControl>
          <Text style={styles.smallText}>Please select a Search type.</Text>
        </VStack>
      </View>
      <View>
        {loading ? (
          <View style={styles.loadContainer}>
            <ActivityIndicator size="large" color="#00bcd4" />
            <Text style={styles.load}>Loading...</Text>
          </View>
        ) : startSearching ? (
          movies.length > 0 ? (
            <MoviesAndTvContainer movies={movies} navigation={navigation} />
          ) : (
            <Text style={styles.startingText}>
              No content available
            </Text>
          )
        ) : (
          <Text style={styles.startingText}>Please Initiate a search</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 10,
  },
  search: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#00bcd4',
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  load: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startingText: {
    paddingTop: 150,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Search;
