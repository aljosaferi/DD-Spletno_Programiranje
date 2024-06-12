import React, { useState, useEffect } from 'react';
import styles from './Restaurant.module.scss'
import { useParams } from 'react-router-dom';


import { getApiCall } from '../../api/apiCalls';


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

interface Tag {
    name: string;
}

interface Menu {
    dish: string;
    sideDishes: string[];
    restaurant: string;
    tag: Tag[];
    _id: string;
    id: string;
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
    photo: Photo;
    mealPrice: number;
    mealSurcharge: number;
    workingHours: WorkingHours[];
    menus: Menu[];
    tags: Tag[];
    ratings: any[];
    __v: number;
    averageRating: number;
    id: string;
}

function Restaurant() {
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const { id } = useParams();

    const countRatings = (ratings: any[], rating: number) => {
        return ratings.filter(r => r.score === rating).length;
    }

    useEffect(() => {
        getApiCall(`http://${process.env.REACT_APP_URL}:3001/restaurants/${id}`)
        .then(data =>  { setRestaurant(data)})
        .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles["container"]}>
            {restaurant &&
            <div className={styles["restaurant"]}>
                <div className={styles["top"]}>
                    <div className={styles["image-container"]}>
                        {/* <img src={`http://${process.env.REACT_APP_URL}:3001${restaurant?.photo.imagePath}`} alt="Restavracija"/> */}
                        <img src={`http://${process.env.REACT_APP_URL}:3001/images/defaultRestaurantPhoto`} alt="Restavracija"/>
                    </div>
                    <div className={styles["right"]}>
                        <div className={styles["text-container"]}>
                        <h1 style={{ fontSize: restaurant.name.length > 30 ? '2.5vw': '' }}>{restaurant.name}</h1>
                            <h2>{restaurant.address}</h2>
                        </div>
                        <div className={styles['rating-container']}>
                            <div className={styles['stars-container']} style={{ '--partial-percentage': `${(restaurant.averageRating % 1 * 100)}%` } as React.CSSProperties}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index}>
                                        {restaurant?.averageRating === 0 ?
                                            <i className='fa-solid fa-star'/>
                                        :
                                            <i
                                                className={`fa-solid fa-star ${restaurant.averageRating >= (index + 1) ? styles['checked'] : ( (((index + 1) - restaurant.averageRating) >= 1 ) ? styles['un-checked'] : styles['partialy-checked'] )}`}
                                            />
                                        }
                                    </div>
                                ))}
                                <span className={styles['tooltip-text']}>
                                    {restaurant.ratings.length === 0 ?
                                        'Neocenjeno'
                                    :
                                        <>{restaurant.averageRating.toFixed(1)}<i className='fa-solid fa-star'/></>
                                    }
                                </span>
                            </div>
                                {restaurant.ratings.length === 0 ?
                                        null
                                    :
                                    <div className={styles['rating-count']}>
                                        {restaurant.ratings.length}x
                                    </div>
                                }
                        </div>
                    </div>
                </div>
                <div className={styles['bottom']}>
                    <div className={styles['left']}>
                        <div className={styles['working-hours-container']}>
                            <h1>Delovni čas</h1>
                            <div className={styles['working-hours']}>
                                {restaurant.workingHours.map(({day, open, close, _id}) => (
                                    <div key={_id}>
                                        <strong>{day}:</strong> {open === 'Zaprto' ? 'Zaprto' : `${open} - ${close}`}
                                    </div>
                                ))}
                            </div>    
                        </div>
                        <div className={styles['rating-all']}>
                            <h1>Ocene</h1>
                            <div className={styles['rating-and-stars']}>
                                <div className={styles['rating-top']}>
                                    <div className={styles['rating-score']}>
                                        {restaurant.averageRating.toFixed(1)}
                                    </div>
                                    <div className={styles['rating-stars']}>
                                        {[5, 4, 3, 2, 1].map((n) => (
                                            <div key={n}>
                                                {Array.from({ length: n }, (_, i) => i + 1).map((i) => (
                                                    <span key={i}><i className='fa-solid fa-star'/></span> // Replace this with what you want to display
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles['rating-bars']}>
                                        {[5, 4, 3, 2, 1].map((n) => {
                                            const count = countRatings(restaurant.ratings, n);
                                            const percentage = restaurant.ratings.length ? (count / restaurant.ratings.length) * 100 : 0;
                                            return (
                                                <div key={n} className={styles['rating-bar']} style={{ '--percentage': `${percentage}%` } as React.CSSProperties}/>
                                            )
                                        })}
                                        <span className={styles['tooltip-text']}>
                                            {[5, 4, 3, 2, 1].map((n) => {
                                                const count = countRatings(restaurant.ratings, n);
                                                return (
                                                    <div key={n}>
                                                        <div className={styles['tooltip-stars']}>
                                                            {Array.from({ length: n }, (_, i) => i + 1).map((i) => (
                                                                <span key={i}><i className='fa-solid fa-star'/></span> // Replace this with what you want to display
                                                            ))}
                                                        </div>
                                                        <div className={styles['tooltip-number']}>
                                                            {count}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles['rating-bottom']}>
                                    <div className={styles['rating-of']}>
                                        od 5
                                    </div>
                                    <div className={styles['total-ratings']}>
                                        {restaurant.ratings.length} ocen{restaurant.ratings.length === 1 ? 'a' : restaurant.ratings.length === 2 ? 'i' : ''}
                                    </div>
                                </div>
                            </div>
                            <div className={styles['user-rate']}>
                                Oceni:
                                <div className={styles['user-rate-stars']}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index}>
                                        {restaurant?.averageRating === 0 ?
                                            <i className='fa-solid fa-star'/>
                                        :
                                            <i
                                                className={`fa-solid fa-star ${restaurant.averageRating >= (index + 1) ? styles['checked'] : ( (((index + 1) - restaurant.averageRating) >= 1 ) ? styles['un-checked'] : styles['partialy-checked'] )}`}
                                            />
                                        }
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["menus-container"]}>
                        <h1>Meniji</h1>
                        <div className={styles["menus"]}>
                            {restaurant.menus.length > 0 ?
                            <>
                                {restaurant.menus.map(({dish, sideDishes, tag, _id}) => (
                                    <div className={styles["menu"]} key={_id}>
                                        <strong>{dish}</strong>
                                        <div className={styles['side-dishes']}>
                                        {sideDishes.map((sideDish) => (
                                            <div>{sideDish}</div>
                                        ))}
                                    </div>
                                    <div className="tag">

                                    </div>
                                    </div>
                                ))}
                            </>
                            :
                                'Ta restavracija nima vpisanih menijev'
                            }
                        </div>    
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Restaurant;