const searchBLL = require("../BLL/searchBLL");
const express = require("express");
const router=express.Router();


router.route("/places").get(async function (req, res){
  const { searchText } =  req.query ;
  const data = await searchBLL.search(searchText);
   res.send(data);
});

router.route("/popular-search").get(async function (req, res){
  const data = await searchBLL.getPopularSearch();
   res.send(data);
});

module.exports = router;