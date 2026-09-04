import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";

//Register new company
export const registerCompany = async (req,res) => {
    const {name, email, password} = req.body;
    const imageFile = req.file;
    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message: "Missing Details"})
    }

    try {
        const companyExists = await Company.findOne({email})
        if (companyExists) {
            return res.json({success:false, message: "Company already register"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({success:true, 
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//company login
export const loginCompany = async(req,res) => {
    const {email, password} = req.body;
    try {
        const company = await Company.findOne({email})
        if(bcrypt.compare(password,company.password)){
            res.json({
                success: true,
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image,
                },
                token: generateToken(company._id)
            })
        }else{
            res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Get company Data
export const getCompanyData = async(req,res) => {
    const company = req.company;
    try {
        res.json({success:true, company})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//Post a new Job
export const postJob = async(req,res) => {
    const {title,description, location, salary, level, category} = req.body;

    const companyId = req.company._id;

    try {
        const newJob = new Job({
            title,
            description,
            location,
            category,
            level,
            salary,
            date: Date.now(),
            companyId,
        })
        await newJob.save()
        res.json({success:true, newJob})
    } catch (error) {
        res.json({success:false, message:error.message})   
    }

}

//Get company job applicants
export const getCompanyJobApplicants = async(req,res) => {

}

//Get company posted Jobs
export const getCompanyPostedJobs = async(req,res) => {
    try {
        const companyId =  req.company._id;

        const jobs = await Job.find({companyId})

        //(Todo) Adding no. of Applicants in data

        res.json({success:true, jobsData: jobs})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

//Change Job Application status
export const ChangeJobApplicationsStatus = async(req,res) => {

}

//Change Job visibility
export const changeVisiblity = async(req,res) => {
    try {
        const {id} = req.body;
        const comapanyId = req.company._id;
        const job = await Job.findById(id)

        if(comapanyId.toString() === job.companyId.toString()){
            job.visible = !job.visible
        }

        await job.save()
        res.json({success:true, job})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}