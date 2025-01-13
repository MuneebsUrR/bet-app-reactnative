import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../app/configs/Firebase';


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sampleBets, setSampleBets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        const docRef = doc(db, "data", "balance");
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
         
          setTotalBalance(docSnap.data().totalBalance);
        } else {
          // docSnap.data() will be undefined in this case
          alert("No such document!");
        }
  
      }
      fetchData();
    }
      , []);



        useEffect(() => {
          const fetchData = async () => {
            const docRef = doc(db, "data", "bets");
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
             
              setSampleBets(docSnap.data().bets);
            } else {
              // docSnap.data() will be undefined in this case
              console.log("No such document!");
            }
      
          }
          fetchData();
        }
          , [sampleBets]);
      

  return (
    <AppContext.Provider value={{ sampleBets, setSampleBets, totalBalance, setTotalBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
