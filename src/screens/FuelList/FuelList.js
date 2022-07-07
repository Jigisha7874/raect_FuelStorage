import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { currency } from '../../utility/constants';
// import Channel from '../../components/Channel';
// import useChannel from '../../hooks/useChannel';
// import useGetChannels from '../../hooks/useGetChannels';
import FuelItems from '../../components/FuelItem';
import Entypo from 'react-native-vector-icons/Entypo';
import { useAppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { logOutUser } from '../../features/whiteList';
import { AppStack, AuthStack } from '../../navigator/navActions';
import { removeFuelItem, setUserMaxAllowance } from '../../features/fuelSlice';

const FuelList = ({
    navigation
}) => {
    const dispatch = useDispatch()
    const { userMaxAllowance, fuelList } = useSelector((state) => state.fuel)
    // const { channelList, loading } = useGetChannels()

    const logoutHandler = () => {
        dispatch(logOutUser())

        navigation.dispatch(AuthStack)
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <MaterialIcons
                        name='logout'
                        size={25}
                        color={'red'}
                        onPress={logoutHandler}
                    />
                )
            }
        })
    }, [])

    const _renderFuelItems = ({ item ,index}) => {
        return (
            <FuelItems {...item}
                removeItem={() => {
                    dispatch(removeFuelItem(index))
                    dispatch(setUserMaxAllowance(userMaxAllowance + item.price))
                }}
            />
        )
    }

    const goToCreateList = () => {
        navigation.navigate('CreateList')
    }

    console.log('fuelList', fuelList)

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#f2f2f2'
        }}  >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                backgroundColor: 'white',
                paddingVertical: 10,
                marginHorizontal: 15,
                paddingHorizontal: 10,
                elevation: 1,
                borderRadius: 5
            }} >
                <Text
                    style={{ fontSize: 15, color: 'black' }}
                >User Allowance Remaining</Text>
                <Text
                    style={{
                        fontSize: 16,
                        color: 'green',
                    }}
                >{userMaxAllowance} {currency}</Text>
            </View>
            <FlatList
                data={fuelList}
                renderItem={_renderFuelItems}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
            />
            <Pressable style={{
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: "center",
                position: 'absolute',
                bottom: 40,
                right: 20,
                backgroundColor: 'green',
                flexDirection: 'row',
                // paddingHorizontal: 15
                width: 50
            }}
                onPress={goToCreateList}
            >
                {/* <Text style={{
                    fontSize: 16,
                    color: 'white'
                }} >Create</Text> */}
                <Entypo
                    name='plus'
                    size={30}
                    color='white'
                />
            </Pressable>
        </View>
    )
}

export default FuelList;