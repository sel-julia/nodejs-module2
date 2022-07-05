import logger from '../logger/Logger';

const errorLogger = (err, req, res, next) => {
    logger.info(`Method ${req.method} ${req.url} is called`);
    if (Object.keys(req.params).length > 0) {
        logger.info(`params: ${JSON.stringify(req.params)}`);
    }
    if (Object.keys(req.body).length > 0) {
        logger.info(`body: ${JSON.stringify(req.body)}`);
    }
    if (Object.keys(req.query).length > 0) {
        logger.info(`query: ${JSON.stringify(req.query)}`);
    }

    logger.error(err);
    res.status(500).send(err.toString());

    next();
};

module.exports = errorLogger;
