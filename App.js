// App.js
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigation from "./navigation/AppNavigation";
import { getToken } from "./api/trips";
import UserContext from "./context/UserContext";

const App = () => {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppNavigation />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;

// import { NavigationContainer } from "@react-navigation/native";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AuthNavigation from "./src/navigation/AuthNavigation";
// import { useEffect, useState } from "react";
// import AppNavigation from "./src/navigation/AppNavigation";
// import UserContext from "./src/context/UserContext";
// import { getToken } from "./src/apis/auth/storage";

// export default function App() {
//   const [user, setUser] = useState(false);

//   const checkToken = async () => {
//     const token = await getToken();
//     if (token) {
//       setUser(true);
//     }
//   };

//   useEffect(() => {
//     checkToken();
//   }, []);

//   return (
//     <QueryClientProvider client={new QueryClient()}>
//       <UserContext.Provider value={{ user, setUser }}>
//         <NavigationContainer>
//           {user ? <AppNavigation /> : <AuthNavigation />}
//         </NavigationContainer>
//       </UserContext.Provider>
//     </QueryClientProvider>
//   );
// }
