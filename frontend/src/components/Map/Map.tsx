import React, { useState, useEffect, useRef } from 'react';
import { point } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';
import { Icon, divIcon } from 'leaflet';

import * as L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';

function Map() {
  const markers = [
    {
      geocode: [46.5580553, 15.6408956],
      name: 'Zlati lev',
    },
    {
      geocode: [46.561465150000004, 15.634077258427485],
      name: 'Baščaršija',
    },
    {
      geocode: [46.5578877, 15.6465533],
      name: 'Papagayo Cocktail Bar & C H O C O',
    },
    {
      geocode: [46.5592431, 15.6473367],
      name: 'Pizzeria in restavracija Ancora',
    },
    {
      geocode: [46.5544983, 15.6525403],
      name: "Chuty's Maribor Europark",
    }
  ]

  const customIcon = new Icon({
    iconUrl: require("./marker.png"),
    iconSize: [38, 38]
  })

  const createCustomClusterIcon = (cluster: any) => {
    const count = cluster.getChildCount();
  
    return L.divIcon({
      html: `<div class="${styles['custom-cluster']}">${count}</div>`,
      className: styles['marker-cluster'],
      iconSize: L.point(40, 40),
    });
  };

  
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        center: [46.554628, 15.645886],
        zoom: 14,
        maxZoom: 22,
      });
      mapRef.current = map;
      
      const markerCluster = new window.L.MarkerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: createCustomClusterIcon
      });

      markers.forEach(marker => {
        const markerInstance =  L.marker(marker.geocode as L.LatLngTuple, { icon: customIcon })
        .addTo(markerCluster)
        .bindPopup(marker.name)
      });

      /* markers.map(marker => (
        L.marker(marker.geocode as L.LatLngTuple, { icon: customIcon })
          .addTo(markerCluster)
          .bindPopup(marker.name)
      )) */

      map.addLayer(markerCluster);

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
      const res = await fetch(`http://${process.env.REACT_APP_URL}:3001/restaurants`);
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
        <div className={styles['restaurants-header']}>TOP RESTAVRACIJEasd</div>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className={styles['restaurant-div']}>
            <h3>{restaurant.name}</h3>
            <div className={styles['restaurant-photo']}>
              <img src={`http://${process.env.REACT_APP_URL}:3001${restaurant.photo.imagePath}`} alt="restaurant" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Map;