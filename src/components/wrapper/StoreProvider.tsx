import React from 'react'
import { Provider } from 'react-redux';
import store from 'reduxStore';


type StoreProviderProps = {
    children: React.ReactNode;
}

const StoreProvider = ({children}: StoreProviderProps) => {

  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider