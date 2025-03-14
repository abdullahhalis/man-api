const { getHome, getManSearch, getManDetails, getChapter } = require('./controller');
const router = require('express').Router();

router.get('/manapp/detail/chapter/:slug', getChapter);
router.get('/manapp/detail/:slug', getManDetails);
router.get('/manapp/search', getManSearch);
router.get('/manapp', getHome);
router.get('/', (req, res) => {
  res.send('Welcome to man-api, REST API to fetch manga/manhwa/manhua data')
})

module.exports = router;