"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../lib/redux/store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
