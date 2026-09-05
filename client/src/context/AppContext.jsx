import { createContext,useEffect,useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [searchFilter , setSearchFilter] = useState({
        title:'',
        location:''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin , setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)


    //function to fetch data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    //functon to fetch company data
    const fetchCompanyData = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token: companyToken}})
            if(data.success){
                setCompanyData(data.company)
                console.log(data)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs()

        const storedComapanyToken = localStorage.getItem('companyToken')
        if(storedComapanyToken){
            setCompanyToken(storedComapanyToken)
        }

    },[])

    useEffect(()=>{
        if(companyToken){
            fetchCompanyData()
        }
    },[companyToken])

    const value = {
        setSearchFilter,searchFilter,
        setIsSearched ,isSearched,
        setJobs, jobs,
        setShowRecruiterLogin, showRecruiterLogin,
        setCompanyToken, companyToken,
        setCompanyData, companyData,
        backendUrl,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};