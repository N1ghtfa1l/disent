import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CountryCard.css'
import { useNavigate } from 'react-router-dom';

interface CountryProps {
  country: {
    name: { common: string };
    population: number;
    region: string;
    flags: {svg: string};
    maps: { googleMaps: string };
  };
}

const CountryCard: FC<CountryProps> = ({ country }) => {
  const router = useNavigate()

  const handleCardClick = () => {
    router(`/country/${country.name.common}`)
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img className='flag-image' variant="top" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <Card.Body>
        <Card.Title>{country.name.common}</Card.Title>
        <Card.Text>
          Population: {country.population.toLocaleString()}
        </Card.Text>
        <Card.Text>
          Region: {country.region}</Card.Text>
        <Button variant="primary" href={country.maps.googleMaps} target="_blank">
          Смотреть на карте
        </Button>
        <Button className='moreBtn' onClick={handleCardClick}>
          Узнать больше
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
