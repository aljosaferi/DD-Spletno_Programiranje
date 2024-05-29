import { useNavigate } from 'react-router-dom';

import { Restaurant } from '../../pages/Restaurants/Restaurants';
import styles from './RestaurantCard.module.scss';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const navigate = useNavigate();

    return (
        <div className={styles['container']} onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
            <div className={styles['image-container']}>
                <img src={`http://${process.env.REACT_APP_URL}:3001${restaurant.photo.imagePath}`} alt="Restavracija"/>
            </div>
            <div className={styles['text-container']}>
                <div className={styles['name']}>
                    <h1>{restaurant.name}</h1>
                </div>
                <div className={styles['meal-price']}>
                    cena obroka: {restaurant.mealPrice} €
                </div>
                <div className={styles['meal-surcharge']}>
                    doplačilo: {restaurant.mealSurcharge} €
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard;