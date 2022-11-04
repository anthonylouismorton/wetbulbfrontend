import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
export const ProgramContext = React.createContext();

function UserProvider({children}){
  const [userProfile, setUserProfile] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const getUserProfile = async () => {
    if(isAuthenticated){
      let email = user.email
      console.log(email)
      const userinfo = await axios.get(`${process.env.REACT_APP_DATABASE}/user/${email}`);
      console.log(email)
      setUserProfile(userinfo.data)
    }
    else{
      setUserProfile({})
    }
  }
  useEffect(() => {
    getUserProfile();
  }, [isAuthenticated]);

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

