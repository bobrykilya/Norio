import { createSlice } from '@reduxjs/toolkit'



const coverPanelSlice = createSlice({
    name: 'coverPanel',
    initialState: 'sign_up_2',
    reducers: {
        toggleCoverPanel: (state, {payload: opened_form}) => {
            return opened_form
        }
    }
})
 
export const { actions, reducer } = coverPanelSlice