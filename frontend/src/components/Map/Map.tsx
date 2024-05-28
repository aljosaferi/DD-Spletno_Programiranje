import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

function Map() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([46.554628, 15.645886], 14);
      mapRef.current = map;

      L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        accessToken: 'nF3h6bDTDG8BmNfnWiMMPfdLv9u59XAdCbISvq8pcVusAWl2FATOJi2noVd44y1q',
      }).addTo(map);
    }

    

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  interface WorkingHours {
    day: string;
    open: string;
    close: string;
    _id: string;
    id: string;
  }

  interface Photo {
    _id: string;
    imagePath: string;
    __v: number;
  }

  interface Restaurant {
    _id: string;
    name: string;
    address: string;
    description: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    owner: string;
    photo: Photo; // Updated photo interface
    mealPrice: number;
    mealSurcharge: number;
    workingHours: WorkingHours[];
    tags: string[];
    ratings: any[];
    __v: number;
    averageRating: number;
    id: string;
  }

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const getRestaurants = async () => {
      const res = await fetch('http://localhost:3001/restaurants');
      const data: Restaurant[] = await res.json();
      console.log(data);
      setRestaurants(data);
    }
    getRestaurants();
  }, []);

  return (
    <div className={styles['container']}>
      <div id="map" className={styles['map']}></div>
      <div className={styles['restaurants']}>
        <div className={styles['restaurants-header']}>NAJJAĆE RESTARVACIJE</div>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className={styles['restaurant-div']}>
            <h3>{restaurant.name}</h3>
            <div className={styles['restaurant-photo']}>
              <img src={`http://localhost:3001${restaurant.photo.imagePath}`} alt="restaurant" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;