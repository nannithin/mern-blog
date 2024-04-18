import { createContext,  useEffect,  useState } from "react"
import Layout from "./components/layout"
import { lookInSession } from "./components/utils/session";
export const UserContext = createContext({})

function App() {

  const [userAuth,setUserAuth] = useState({});
  useEffect(() => {

        let userInSession = lookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth(null)
    
    }, [])

  return (
    <div className="bg-white min-h-screen w-full">
      <UserContext.Provider value={{userAuth,setUserAuth}}>
        <Layout />
      </UserContext.Provider>
    </div>
  )
}

export default App
