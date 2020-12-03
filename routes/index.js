const rentingInfoRoutes = require('./rentingInfo');
const userRoutes = require('./users');
const carsRoutes = require('./cars');
const reviewsRoutes = require('./reviews');
const homeRoutes = require('./home');

const constructorMethod = (app) => {
    app.use('/rentingInfo', rentingInfoRoutes);
    app.use("/users", userRoutes);
    app.use('/cars', carsRoutes); 
    app.use('/reviews', reviewsRoutes); 
    app.use('/',homeRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Page not found'});
    });
};

module.exports = constructorMethod;