const searchModel = require('../Models/searchModel')
const axios = require('axios')

const search = async (searchText) => {
  const config = {
    method: 'get',
    url: `${process.env.GOOGLE_MAPS_BASE_URL}/maps/api/place/textsearch/json`,
    params: {
      language: 'iw',
      query: searchText,
      key:process.env.GOOGLE_MAPS_KEY
    },
  }
  const response = await axios(config)
  const nearby5Places = response.data.results.slice(0, 5)
  const formatForResult = nearby5Places.map((n) => {
    return { name: n.name, address: n.formatted_address }
  })

  await saveSearchText(searchText);
  return formatForResult
}

const saveSearchText = async (searchText) => {
  const searchTextExist = await searchModel.findOne({ search: searchText })
  if (searchTextExist) {
    await searchModel.findOneAndUpdate(
      { search: searchText },
      { counter: searchTextExist.counter + 1 },
    )
  } else {
    const saveSearch = new searchModel({
      search: searchText,
      counter: 1,
    })
    await saveSearch.save()
  }
}

const getPopularSearch = async () => {
  return searchModel.findOne().sort({ counter: 'desc' })
}



module.exports = { search, getPopularSearch }
