import { useState, useEffect } from 'react';

import styles from './Restaurants.module.scss';
import { getApiCall } from '../../api/apiCalls';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';

type WorkingHour = {
    day: string;
    open: string;
    close: string;
    /* _id: string;
    id: string; */
};

type Photo = {
    _id: string;
    imagePath: string;
    __v: number;
};

type Location = {
    type: string;
    coordinates: number[];
};

export type Restaurant = {
    location: Location;
    _id: string;
    name: string;
    address: string;
    owner: string;
    photo: Photo;
    mealPrice: number;
    mealSurcharge: number;
    workingHours: WorkingHour[];
    tags: string[];
    ratings: any[]; 
    __v: number;
    averageRating: number;
    id: string;
};
function Restaurants() {
    const [restaurants, setRetaurants] = useState<Restaurant[] | null>(null);

    useEffect(() => {
        getApiCall(`http://${process.env.REACT_APP_URL}:3001/restaurants`)
        .then(data =>  { setRetaurants(data)})
        .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles['container']}>
            <div className={styles['restaurants']}>
                {restaurants && restaurants.map((restaurant, index) => (
                    <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
                ))}
            </div>
        </div>
    )
}

export default Restaurants;