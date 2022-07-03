import logger from '../logger/Logger';

const errorLogger = (error, req, res) => {
    logger.error(error);
    return res.status(500).send(error.toString());
};

module.exports = errorLogger;
