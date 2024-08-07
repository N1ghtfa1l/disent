import React, { useEffect, useState } from 'react';
import './css/App.css';
import CountryCard from './components/CountryCard/ContryCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostService from './API/PostService';
import { Route, Routes } from 'react-router-dom';
import CountryInfo from './components/CountryInfo/CountryInfo';
import { Country } from './types/type';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await PostService.getAll();
        setCountries(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountries();
  }, []);

 

  return (
    <Routes>
      <Route path="*" element={
        <div className="container">
          {countries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      } />
      <Route path="/country/:name" element={<CountryInfo />} />
    </Routes>
  );
}

export default App;
