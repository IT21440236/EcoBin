import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, FlatList, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
// import dummyData from './dummyData';
import ButtonComp from '../../Components/ButtonComp';
import colors from '../../styles/color';
import { useNavigation } from '@react-navigation/native'

import { db } from '../../../config';
import { ref, onValue, remove} from 'firebase/database'

const AllCommunity = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // const handleItemPress = (item) => {
    //     // Navigate to the desired page with the item data
    //     navigation.navigate('OnePost', { item });
    // };

    const handleImagePress1 = () => {
        // Navigate to the 'UpdateAdvertise' screen when the image is pressed
        navigation.navigate('AddPost');
    };

    useEffect(() => {
        // Use the Firebase Realtime Database reference to listen for data changes
        const communityRef = ref(db, 'community');
        onValue(communityRef, (snapshot) => {
            const dataFromDB = snapshot.val();
            if (dataFromDB) {
                // Convert the data from an object to an array of items
                const dataArray = Object.keys(dataFromDB).map((key) => ({
                    id: key,
                    ...dataFromDB[key],
                }));
                setData(dataArray);
            }
        });
    }, []);

    // const handleLike = (item) => {
    //     // Ensure 'likes' is a valid number or initialize it with 0
    //     const newLikes = isNaN(item.likes) ? 0 : item.likes + 1;

    //     // Update the like count for the post in the database
    //     const postRef = ref(db, `community/${item.id}`);
    //     set(postRef, {
    //         likes: newLikes,
    //     });
    // };

    const handleSingleItem = (item) => {
        // Navigate to the update page with the item data
        navigation.navigate('OnePost', { item });
    };

    const filteredData = data.filter((item) => {
        // Filter the data based on the search query
        const normalizedQuery = searchQuery.toLowerCase();
        // return item.topic.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery);
        // Check if 'item.communityType', 'item.topic', and 'item.description' exist before using toLowerCase()
        // const communityType = item.communityType ? item.communityType.toLowerCase() : '';
        // const topic = item.topic ? item.topic.toLowerCase() : '';
        // const description = item.description ? item.description.toLowerCase() : '';

        // return (
        //     communityType === 'residential users' &&
        //     (communityType.includes(normalizedQuery) ||
        //         topic.includes(normalizedQuery) ||
        //         description.includes(normalizedQuery))
        // );

        return (
            item.communityType.toLowerCase() === 'residential users' &&
            (item.communityType.toLowerCase().includes(normalizedQuery) ||
                item.topic.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery))
        );
    });



    return (
        <View style={styles.container}>
            <ImageBackground
                source={imagePath.background}
                style={styles.imgStyle}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerStyle}>
                        <Image source={imagePath.backarrow} />
                        <Image source={imagePath.bell} />
                    </View>
                    <Text style={styles.AdvertiseTextStyle}>Residential User</Text>
                </SafeAreaView>
            </ImageBackground>
            <View style={{
                marginTop: moderateVerticalScale(14),
                marginHorizontal: moderateScale(16),
                flex: 1
            }}>
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={dummyData}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
                /> */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={dummyData}
                    ItemSeparatorComponent={() => <View style={{ marginBottom: moderateVerticalScale(16) }} />}
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSingleItem(item)}>
                            <View style={styles.itemContainer}>
                                {/* <Text style={styles.title}>{item.advertiseType}</Text> */}
                                <Text style={styles.body}>{item.topic}</Text>
                                <Text style={styles.body}>{item.description}</Text>
                                {/* <TouchableOpacity onPress={() => handleLike(item)}>
                                    <Text style={styles.likeButton}>Like ({item.likes})</Text>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity onPress={() => handleUpdate(item)}>
                                    <Text style={styles.updateButton}>Update</Text>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.deleteButton}>Delete</Text>
                                </TouchableOpacity> */}
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.AddButton} onPress={handleImagePress1}>
                    <View>
                        <Image source={imagePath.addbtn} style={styles.AddIconImage} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AllCommunity

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgStyle: {
        height: 200,
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    AdvertiseTextStyle: {
        fontSize: scale(25),
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 100
    },
    headerStyle: {
        paddingVertical: moderateVerticalScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: moderateScale(16)
    },
    flatStyle: {
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        padding: moderateScale(16),
        borderRadius: moderateScale(4),
        margin: 2
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    AddButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        display: 'flex',
        bottom: 0,
        right: 0,
        position: "absolute",
        marginRight: 25,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    AddIconImage: {
        width: 50,
        height: 50,
        // backgroundColor:"#fff",
        // color:"#fff"
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10, backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
        marginTop: 8,
    },
    searchInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: 'white', // Background color
        marginBottom: 28,
        alignSelf: "center"
    },
    likeButton: {
        fontSize: 16,
        color: 'blue', // You can style the like button as you prefer
        marginTop: 8,
        fontWeight: 'bold',
    }
})