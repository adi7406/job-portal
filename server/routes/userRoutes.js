import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controller/userController.js'
import upload from '../config/multer.js'

const router = express.Router()

//Get user data
router.get('/user',getUserData)

//Apply for Job
router.post('/apply',applyForJob)

//Get applied Job
router.get('/applications',getUserJobApplications)

//Update User profile(resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router