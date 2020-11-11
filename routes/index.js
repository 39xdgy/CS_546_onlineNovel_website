const rentingInfoRoutes = require('./rentingInfo');

const constructorMethod = (app) => {
    app.use('/rentingInfo', rentingInfoRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not fond'});
    });
};

module.exports = constructorMethod;