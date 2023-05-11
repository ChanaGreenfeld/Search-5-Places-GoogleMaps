const membersBll = require("../bll/membersBll");
const express = require("express");
const router=express.Router();



router.route("/getAllMembers").get(async function (req, res){
  let data = await membersBll.getAll();
   res.send(data);
});


router.route("/getMemberById/:id").get(async function(req, res){
  let id = req.params.id;
  let data = await membersBll.getMemberById(id)
  res.send(data)
})

router.route("/getactivePatientsLastMonth").get(async function(req, res){
    let id = req.params.id;
    let data = await coronaDetailBll.activePatientsLastMonth()
    res.send(data)
  })
  
router.route("/getMemberthatNotVaccinatied").get(async function(req, res){
let data = await coronaDetailBll.getMemberthatNotVaccinatied()
res.status(200).json(data);
})

router.route("/addMember").post(async function(req, res){
   let member = req.body;
  let data =await membersBll.addMember(member)
  res.send(data)
})

router.route("/addNewVaccinatedToMember/:id").post(async function(req, res){
    let id = req.params.id;
    let vaccinations = req.body;
   let data =await membersBll.addNewVaccinatedToMember(vaccinations)
   res.send(data)
 })

 router.route("/uploadPicture/:id").post(async function(req, res){
    let id = req.params.id;
    let picture = req.body;
   let data =await membersBll.uploadPicture(id,picture.pictureData,picture.contentType)
   res.send(data)
 })


module.exports=router


