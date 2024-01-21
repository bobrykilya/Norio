import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as coverPanelReducer } from './LoginPanel/coverPanel.slice'

const reducers = combineReducers({
    coverPanel: coverPanelReducer
})


export const store = configureStore({
    reducer: {
        coverPanel: reducers,
    }
})
