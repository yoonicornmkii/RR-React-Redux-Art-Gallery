import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10000,
    apiData: {},
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return { ...state, apiData: action.payload } 
        },
        addID: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        reduceID: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        },
        customID: (state, action) => {
            return { objectId: state.objectId + action.payload }
        },
        clearData: () => {
            return  initialState 
        },
    }
})

export const {setData, addID, reduceID, customID, clearData} = dataSlice.actions

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await response.json()
        console.log(resData)
        dispatch(setData(resData))
    }
    return dataThunk
}

export default dataSlice.reducer