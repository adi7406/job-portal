import { createContext,useEffect,useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [searchFilter , setSearchFilter] = useState({
        title:'',
        location:''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin , setShowRecruiterLogin] = useState(false)

    //function to fetch data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(()=>{
        fetchJobs()
    },[])

    const value = {
        setSearchFilter,searchFilter,
        setIsSearched ,isSearched,
        setJobs, jobs,
        setShowRecruiterLogin, showRecruiterLogin,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};