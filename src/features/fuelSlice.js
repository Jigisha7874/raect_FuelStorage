import { createSlice } from '@reduxjs/toolkit';

const fuelSlice = createSlice({
    name: 'fuelSlice',
    initialState: {
        fuelList: [],
        fuelTypes: [],
        userMaxAllowance: 0,
    },
    reducers: {
        setFuelTypes: (state, action) => {
            state.fuelTypes = action.payload
        },
        createFuelList: (state, action) => {
            let data = [...state.fuelList]
            data.push(action.payload)
            state.fuelList = data
        },
        removeFuelItem: (state, {payload:index}) => {
            state.fuelList.splice(index, 1)
        },
        setUserMaxAllowance: (state, action) => {
            state.userMaxAllowance = action.payload
        }
    }
});

export const { setFuelTypes, createFuelList, setUserMaxAllowance, removeFuelItem } = fuelSlice.actions;
export default fuelSlice.reducer;