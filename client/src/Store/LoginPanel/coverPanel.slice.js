import { createSlice } from '@reduxjs/toolkit'



const coverPanelSlice = createSlice({
    name: 'coverPanel',
    initialState: 'sign_in',
    // initialState: 'sign_up',
    reducers: {
        toggleCoverPanel: (state, {payload: opened_form}) => {
            return opened_form
        }
    }
})
 
export const { actions, reducer } = coverPanelSlice