import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { database } from '../components/firebase';
import { useEffect, useState } from "react";

function useGetAndFetchUsers() {
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState("");
  
  useEffect(function () {
  const unsubscribe = onSnapshot(collection(database, 'Users'), querySnapshot => {

    const usersArray =[]
    querySnapshot.forEach(doc => usersArray.push(doc.data()))
    setUsers(usersArray)
  })    
    
  return () => unsubscribe()
    
    
  }, []);

  return { users, activeId, setActiveId, setUsers };
}

export default useGetAndFetchUsers;
