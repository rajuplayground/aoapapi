import { Router } from "express";
import {
  addCampus,
  addCity,
  addCityForEntrance,
  addCourse,
  addDistrict,
  addGender,
  addInfoSource,
  addProgrammeToEntrance,
  addSocialStatus,
  addState,
  createProgramme,
  getCampus,
  getCityForExam,
  getCityFromDistrict,
  getCourses,
  getDistrictsFromState,
  getGender,
  getInfoSource,
  getProgrammes,
  getProgrammesByEntrance,
  getSocialStatus,
  getStates,
  removeCampus,
  removeCity,
  removeCityForEntrance,
  removeCourse,
  removeDistrict,
  removeEntranceFromProgram,
  removeGender,
  removeInfoSource,
  removeProgramme,
  removeSocialStatus,
  removeState,
  updateCampus,
  updateCity,
  updateCityForEntrance,
  updateCourse,
  updateDistrict,
  updateGender,
  updateInfoSource,
  updateSocialStatus,
  updateState,
} from "./handlers/master";
import {
  createCandidateParent,
  createCandidatePlustwo,
  createOtp,
  currentUser,
  getCandidate,
  getCandidateParent,
  getCandidatePustwo,
  putCandidate,
  putOnboarding,
  signin,
  signout,
} from "./handlers/candidate";
import { requireAuth } from "./middlewares/require-auth";
import {
  createEntrance,
  getEntrances,
  removeEntrance,
  updateEntrance,
} from "./handlers/entrance/entrance";
import {
  createApplication,
  createExam,
  getAllExams,
  getApplication,
  getOpenExams,
  updateExam,
} from "./handlers/entrance";
import {
  checkExamValid,
  getExamsByEntrance,
  registerForExam,
} from "./handlers/entrance/exam";
import {
  addCityToApplication,
  addProgrammeToApplication,
  getApplicationByExam,
  getApplicationJeeStatus,
  getCityByApplication,
  getProgrammeByApplication,
  removeCityFromApplication,
  removeProgrammeFromApplication,
  updateApplication,
  updateApplicationJeeStatus,
  updateApplicationProgress,
} from "./handlers/entrance/application";
import { sendEmailOtp, verifyEmail } from "./handlers/email";
import {
  adminSignin,
  createAdminUser,
  currentAdminUser,
} from "./handlers/admin";
import { requireCandidate } from "./middlewares/require-candidate";
import { sendPhoneOtp, verifyPhone } from "./handlers/phone";

const router = Router();

//candidate
router.post("/candiate/createotp", createOtp);
router.post("/candidate/signin", signin);
router.post("/candidate/signout", requireAuth, signout);
router.post("/candidate/currentuser", requireAuth, currentUser);
router.get("/candidate", requireAuth, requireCandidate, getCandidate);
router.put("/candidate", requireAuth, putCandidate);
router.post("/candidate/parent", requireAuth, createCandidateParent);
router.get("/candidate/parent", requireAuth, getCandidateParent);
router.post("/candidate/plustwo", requireAuth, createCandidatePlustwo);
router.get("/candidate/plustwo", requireAuth, getCandidatePustwo);
router.put("/candidate/onboarding", requireAuth, putOnboarding);

//master data
router.get("/master/gender", getGender);
router.post("/master/gender", addGender);
router.put("/master/gender/:id", updateGender);
router.delete("/master/gender/:id", removeGender);
router.get("/master/socialstatus", getSocialStatus);
router.post("/master/socialstatus", addSocialStatus);
router.put("/master/socialstatus/:id", updateSocialStatus);
router.delete("/master/socialstatus/:id", removeSocialStatus);
router.get("/master/infosource", getInfoSource);
router.post("/master/infosource", addInfoSource);
router.put("/master/infosource/:id", updateInfoSource);
router.delete("/master/infosource/:id", removeInfoSource);
router.get("/master/states", getStates);
router.post("/master/states", addState);
router.put("/master/states/:id", updateState);
router.delete("/master/states/:id", removeState);
router.get("/master/course", getCourses);
router.post("/master/course/", addCourse);
router.put("/master/course/:id", updateCourse);
router.delete("/master/course/:id", removeCourse);
router.post("/master/campus/", addCampus);
router.get("/master/campus/", getCampus);
router.put("/master/campus/:id", updateCampus);
router.delete("/master/campus/:id", removeCampus);
router.get("/master/district/:stateId", getDistrictsFromState);
router.post("/master/district/", addDistrict);
router.put("/master/district/:id", updateDistrict);
router.delete("/master/district/:id", removeDistrict);

router.get("/master/city/:districtId", getCityFromDistrict);
router.post("/master/city/", addCity);
router.put("/master/city/:id", updateCity);
router.delete("/master/city/:id", removeCity);

router.post("/master/programme/", createProgramme);
router.get("/master/programme/", getProgrammes);
router.delete("/master/programme/:id", removeProgramme);

router.get("/master/examcity/:entranceid", getCityForExam);
router.post("/master/examcity/", addCityForEntrance);
router.put("/master/examcity/:id", updateCityForEntrance);
router.delete("/master/examcity/:id", removeCityForEntrance);

router.post("/master/entrance/programme", addProgrammeToEntrance);
router.delete(
  "/master/entrance/:entranceId/programme/:programmeId",
  removeEntranceFromProgram
);
router.get("/master/entrance/:entranceId/programme", getProgrammesByEntrance);

// entrance and exam
router.post("/entrance", requireAuth, createEntrance);
router.get("/entrance", requireAuth, getEntrances);
router.delete("/entrance/:id", requireAuth, removeEntrance);
router.put("/entrance/:id", requireAuth, updateEntrance);
router.post("/exam", requireAuth, createExam);
router.put("/exam/:id", requireAuth, updateExam);
router.post("/exam/check/:id", requireAuth, checkExamValid);
router.get("/exam/open", requireAuth, getOpenExams);
router.post("/exam/register", requireAuth, registerForExam);
router.get("/exam", requireAuth, getAllExams);
router.get("/exam/:entranceId", requireAuth, getExamsByEntrance);
router.post("/application", requireAuth, createApplication);
router.post(
  "/application/:id/progress",
  requireAuth,
  updateApplicationProgress
);
router.get("/application/:id", requireAuth, getApplication);
router.put("/application/:id", requireAuth, updateApplication);
router.get("/application/exam/:examid/", requireAuth, getApplicationByExam);
router.post("/application/:id/programme", addProgrammeToApplication);
router.delete(
  "/application/:id/programme/:programmeId",
  removeProgrammeFromApplication
);
router.get("/application/:id/programme", getProgrammeByApplication);
router.post("/application/:id/jee", updateApplicationJeeStatus);
router.get("/application/:id/jee", getApplicationJeeStatus);
router.post("/application/:id/city", addCityToApplication);
router.get("/application/:id/city", getCityByApplication);
router.delete("/application/:id/city/:examcityId", removeCityFromApplication);
router.post("/email/otp", sendEmailOtp);
router.post("/email/verify", verifyEmail);
router.post("/phone/otp", sendPhoneOtp);
router.post("/phone/verify", verifyPhone);

//admin
router.post("/admin/signin", adminSignin);
router.post("/admin/register", createAdminUser);
router.post("/admin/currentuser", requireAuth, currentAdminUser);

export default router;
