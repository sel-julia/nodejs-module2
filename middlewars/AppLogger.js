const appLoger = (req, res, next) => {
    // Task 5.1
    console.log(`[APP_LOGS] method ${req.method} ${req.url}`);
    if (Object.keys(req.params).length > 0) {
        console.log(`[APP_LOGS] params: ${JSON.stringify(req.params)}`);
    }
    if (Object.keys(req.body).length > 0) {
        console.log(`[APP_LOGS] body: ${JSON.stringify(req.body)}`);
    }
    if (Object.keys(req.query).length > 0) {
        console.log(`[APP_LOGS] query: ${JSON.stringify(req.query)}`);
    }

    next();
};

module.exports = appLoger;
