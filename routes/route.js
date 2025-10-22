const { getHome, getManSearch, getManDetails, getChapter } = require('./controller');
const router = require('express').Router();

router.get('/manapp/detail/chapter/:slug', getChapter);
router.get('/manapp/detail/:slug', getManDetails);
router.get('/manapp/search', getManSearch);
router.get('/manapp', getHome);
router.get('/', (_, res) => {
  res.send('Welcome to man-api, REST API to fetch manga/manhwa/manhua data, go to /api-docs for more info');
})

module.exports = router;