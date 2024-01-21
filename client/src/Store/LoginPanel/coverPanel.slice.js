import { createSlice } from '@reduxjs/toolkit'



const coverPanelSlice = createSlice({
    name: 'coverPanel',
    initialState: 'opened_sign_up_2',
    reducers: {
        toggleCoverPanel: (state, {payload: opened_form}) => {
            return `opened_${opened_form}`
        }
    }
})
 
export const { actions, reducer } = coverPanelSlice