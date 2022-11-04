import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
export const ProgramContext = React.createContext();

function UserProvider({children}){
  const [userProfile, setUserProfile] = useState({user: {nickName: ''}});
  const { user, isAuthenticated} = useAuth0();
  console.log(user)

  const getTechs = async () => {
    // if(userProfile.user.nickName === ''){
    //   let techList= await axios.get(`${process.env.REACT_APP_DATABASE}/technician`);
    //   if(isAuthenticated){
    //     let currentUser = techList.data.filter(tech => tech.technicianEmail === user.email)
    //     setUserProfile({...currentUser[0], user})
    //   }
    // }
  }
  useEffect(()=> {
    getTechs();
  }, [isAuthenticated, user, userProfile]);

  let values = {
    userProfile
  }

  return (
    <ProgramContext.Provider value={values}>
      {children}
    </ProgramContext.Provider>
  );
  
}

export default UserProvider;

