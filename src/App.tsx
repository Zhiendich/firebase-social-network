import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/providers/AuthProvider';
import MainPage from './pages/mainPage/MainPage';
import { IUser } from './types';
import { getAuth } from "firebase/auth";


type searchContext = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const searchPostContext = React.createContext({} as searchContext);

function App() {

  const [value, setValue] = useState('')





  return (

    <BrowserRouter>
      <AuthProvider>
        <searchPostContext.Provider value={{ value, setValue }}>

          <MainPage />

        </searchPostContext.Provider>
      </AuthProvider>

    </BrowserRouter>

  );
}

export default App;
