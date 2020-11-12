const rentingInfoRoutes = require('./rentingInfo');
const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/rentingInfo', rentingInfoRoutes);
    app.use("/users", userRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ Error: 'Page not found'});
    });
};

module.exports = constructorMethod;