import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FuelTypeList from '../../modals/FuelTypeList';
import { FuelTypeArray } from '../../utility/constants';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { createFuelList, setUserMaxAllowance } from '../../features/fuelSlice';

const CreateList = ({
    navigation
}) => {
    const dispatch = useDispatch()

    const { userMaxAllowance } = useSelector((state) => state.fuel)

    const fuelTypeModalRef = useRef()
    const [fuelType, setFuelType] = useState(FuelTypeArray[0])
    const [unit, setUnit] = useState('')

    const openFuelTypeModal = () => {
        fuelTypeModalRef.current?.present()
    }

    console.log(userMaxAllowance)

    const createListHandler = () => {
        // const availableBalance = 300
        const totalPrice = Number(unit) * fuelType?.price

        // console.log(totalPrice > userMaxAllowance)
        console.log('totalPrice',totalPrice)
        console.log('userMaxAllowance',userMaxAllowance)
        if (!unit) {
            Toast.show({
                type: 'error',
                text1: `Fields required`
            });
            return;
        }

        if (totalPrice > Number(userMaxAllowance)) {
            console.log('helo')
            Toast.show({
                type: 'error',
                text1: "Sorry! You don't have enough balance!."
            });
            return;
        }
        const data = {
            id: new Date().getTime(),
            fuelType: fuelType?.fuelType,
            type: fuelType?.type,
            unit,
            price: totalPrice
        }
        console.log('data',data)

        dispatch(createFuelList(data))
        dispatch(setUserMaxAllowance(userMaxAllowance - totalPrice))
        // console.log('available')
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <Text style={{
                fontSize: 15,
                color: 'black',
                marginHorizontal: 15,
                marginTop: 20
            }} >Fuel Type</Text>
            <Pressable style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 5,
                height: 45,
                marginHorizontal: 15,
                paddingHorizontal: 10,
                justifyContent: 'center',
                marginTop: 10
            }}
                onPress={openFuelTypeModal}
            >
                <Text style={{
                    fontSize: 14,
                    color: 'black',
                    maxWidth: '80%'
                }} >{fuelType?.fuelType}</Text>
                <Ionicons
                    name='caret-down-outline'
                    size={25}
                    style={{ position: 'absolute', right: 10 }}
                />
            </Pressable>
            <Text style={{
                fontSize: 15,
                color: 'black',
                marginHorizontal: 15,
                marginTop: 20
            }} >Enter in {fuelType.type}</Text>
            <TextInput
                style={{
                    marginHorizontal: 15,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    height: 45,
                    paddingHorizontal: 10
                }}
                placeholder='Enter liters / charges unit here.. '
                keyboardType='number-pad'
                value={unit}
                onChangeText={(value) => setUnit(value.replace(/[^0-9]/g, ''))}
                maxLength={3}
            />
            <Pressable
                style={{
                    backgroundColor: 'orange',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 15,
                    marginTop: 15,
                    borderRadius: 4
                }}
                onPress={createListHandler}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                    }}
                >Create</Text>
            </Pressable>
            <FuelTypeList
                modalizeRef={fuelTypeModalRef}
                onChangeFuelType={(value) => {
                    setFuelType(value)
                    fuelTypeModalRef.current?.close()
                }}
            />
        </View>
    )
}

export default CreateList;