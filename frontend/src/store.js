import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import notesReducer from "./slices/notesSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        notes: notesReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
