const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        res.json(cachedData);
    } else {

        const originalJson = res.json;
        res.json = (data) => {
            cache.set(cacheKey, data, 900); //15 sec
            originalJson.call(res, data);
        };

        next();
    }
};

module.exports = cacheMiddleware;
