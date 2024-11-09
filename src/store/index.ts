import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Use session storage
import authReducer from './userSlice';
import PsychologicalProfileReducer from './psychologicalProfileSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession, // Set storage to session storage
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  psychologicalProfile: persistReducer(
    persistConfig,
    PsychologicalProfileReducer
  ),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
