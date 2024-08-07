import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../../API/PostService";
import { Container, Card, Button } from "react-bootstrap";
import './CountryInfo.css'

interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: { svg: string };
  maps: { googleMaps: string };
  capital: string[];
  subregion: string;
  languages: { [key: string]: string };
}

const CountryInfo = () => {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const router = useNavigate();

  const handlBack = () => {
    router("/");
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await PostService.getAll();
        const foundCountry = data.find((c: Country) => c.name.common === name);
        setCountry(foundCountry || null);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCountry();
  }, [name]);

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <Container>
      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
        />
        <Card.Body>
          <Card.Title>{country.name.common}</Card.Title>
          <Card.Text>
            Population: {country.population.toLocaleString()}
          </Card.Text>
          <Card.Text>Region: {country.region}</Card.Text>
          <Card.Text>Subregion: {country.subregion}</Card.Text>
          <Card.Text>Capital: {country.capital.join(", ")}</Card.Text>
          <Card.Text>
            Languages: {Object.values(country.languages).join(", ")}
          </Card.Text>
          <Button
            variant="primary"
            href={country.maps.googleMaps}
            target="_blank"
          >
            Смотреть на карте
          </Button>
          <Button className="backBtn" variant="primary" onClick={handlBack}>Назад</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CountryInfo;
