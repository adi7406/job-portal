import { getJobById, getJobs } from "../controller/jobController.js";
import express from 'express'

const router = express.Router()

//Route to get all the jobs
router.get('/', getJobs)

//Routes to get a single job by Id
router.get('/:id',getJobById)

export default router