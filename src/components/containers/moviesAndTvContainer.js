import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const MoviesAndTvContainer = ({ navigation, movies }) => {
    return (
        <FlatList
            data={movies}
            renderItem={({ item }) => (
                <View style={styles.mainCard}>
                    <Image
                        style={styles.imgStyle}
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                    />
                    <View style={styles.detailsSection}>
                        <Text style={styles.titleStyle}>{item.title ? item.title : item.name}</Text>
                        <Text style={styles.popularityStyle}>Popularity: {item.popularity}</Text>
                        <Text style={styles.releaseStyle}>Release Date: {item.release_date}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Show', { title: item.title ? item.title : item.name, pic: item.poster_path, overview: item.overview, popularity: item.popularity, releaseDate: item.release_date })}
                        >
                            <Text style={styles.buttonText}>More Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            
        />
    );
}

const styles = StyleSheet.create({
    mainCard: {
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        shadowRadius: 2,
    },    
    imgStyle: {
        width: 120,
        height: 120,
    },
    detailsSection: {
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 10,
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    popularityStyle: {
        margin : 2,
        fontSize: 12,
        color: '#666',
    },
    releaseStyle: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#33B8FF',
    },    
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MoviesAndTvContainer;
