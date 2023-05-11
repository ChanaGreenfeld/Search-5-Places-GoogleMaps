const MembersModel = require('../models/membersModel')

//הבא את כל המשתמשים
const getAll = async () => {
  return await MembersModel.find({})
}

//הבא משתמש באמצעות תעודת זהות
const getMemberById = async (memberId) => {
  return await MembersModel.findOne({ MemberID : memberId})
}

//הבא משתמשים שאינם מחוסנים כלל
const getMemberthatNotVaccinatied = async () => {
    const members = await MembersModel.find({ vaccinations: { $size: 0 } });
   return members.length
}
  
  //הוספת משתמש חדש למערכת
const addMember = async (newMember) => {
    //בדיקות תקינות 
    if (!newMember.MemberID || !newMember.firstName || !newMember.lastName) {
        throw new Error("Member ID, first name and last name are required fields.");
      }
      
      if (!(new Date(newMember.dateOfBirth).getTime() > 0)) {
        throw new Error("Invalid date of birth.");
      }

        const phonePattern = /^\d{3}-\d{7}$/; 
      if (!phonePattern.test(newMember.telephone) || !phonePattern.test(newMember.mobile)) {
        throw new Error("Invalid phone or mobile number.");
      }
      
      if (newMember.vaccinations) {
        newMember.vaccinations.forEach(vaccination => {
          if (!vaccination.manufacturer || !(new Date(vaccination.vaccinatedDate).getTime() > 0)) {
            throw new Error("Invalid vaccination data.");
          }
        });
      }

  const member = new MembersModel({
    MemberID: newMember.MemberID,
    firstName : newMember.firstName,
    lastName : newMember.lastName,
    address : newMember.address,
    dateOfBirth : newMember.dateOfBirth,
    telephone : newMember.telephone,
    mobile : newMember.mobile,
    vaccinations : newMember.vaccinations, 
    dateOfRecovery: newMember.dateOfRecovery,
    positiveResult: newMember.positiveResult
  })
   await member.save();
   return member;
}

// הוספת תאריך קבלת חיסון חדש ושם יצרן למשתמש קיים עד למקסימום 4 חיסונים
const addNewVaccinatedToMember = async (id , vaccinations) => {
    const member = await MembersModel.findOne({ MemberID:id });
    if (member) {
      if (member.vaccinations.length < 4) {
        member.vaccinations.push(vaccinations);
        await member.save();
      } else {
        console.log(`Member with ID: ${id} has already been vaccinated 4 times`);
      }
  }
}

// כמה חולים פעילים היו בכל יום בחודש האחרון
const activePatientsLastMonth =async ()=>{
    let activePatientsByDay = {};
    let today = new Date();
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    let allMembers = await coronaDetailsModel.find();

    while (oneMonthAgo <= today) {
        let dayStart = new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), oneMonthAgo.getDate());
        let dayEnd = new Date(oneMonthAgo.getFullYear(), oneMonthAgo.getMonth(), oneMonthAgo.getDate() + 1);

        let activeMembers = allMembers.filter(member =>
            (member.dateOfRecovery && member.dateOfRecovery >= dayStart && member.dateOfRecovery < dayEnd) ||
            (member.positiveResult && member.positiveResult >= dayStart && member.positiveResult < dayEnd)
        );

        activePatientsByDay[dayStart.toISOString().substr(0, 10)] = activeMembers.length;

        oneMonthAgo.setDate(oneMonthAgo.getDate() + 1);
    }

    return activePatientsByDay;
}

const uploadPicture =async(memberID, pictureData, contentType)=>{
    let member = await MembersModel.findOne({ MemberID: memberID });
  if (member) {
    member.picture.data = Buffer.from(pictureData, 'base64');
    member.picture.contentType = contentType;
    await member.save();
    }

}

module.exports = { getAll, getMemberById, getMemberthatNotVaccinatied, addMember, addNewVaccinatedToMember,activePatientsLastMonth ,uploadPicture}