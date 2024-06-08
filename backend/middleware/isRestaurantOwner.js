function isRestaurantOwner(req, res, next){
    console.log("Is owner");

    try {
        if(req.user.userType === "admin" || req.user.userType === "restaurantOwner") {
            console.log("Restaurant owner");
            next();
        } else {
            console.log("Restaurant owner else");

            res.status(401).json({ error: "You must be an restaurantOwner to edit this" });
        }
    } catch(error) {
        console.log("Restaurant owner error catcher");

        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = isRestaurantOwner