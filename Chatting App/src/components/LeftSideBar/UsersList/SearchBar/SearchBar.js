import searchIcon from "../../../../Assets/search.svg";
import style from "./SearchBar.module.css";
import { toast } from "react-toastify";

function SearchBar({ users, setDisplayedUsers }) {


  function handleSearchUsers(e) {
    if (e.target.value ==='' ) return setDisplayedUsers([])
    
      const displayedUsers = user => user.username.toLowerCase().includes(e.target.value.toLowerCase())

      if (e.target.value && users.filter(displayedUsers).length === 0) {
        toast.error('No such User Exist', {position: 'top-center'})
      }
         
      
    setDisplayedUsers(users.filter(displayedUsers))
  }


  
  
  
  return (
    <div className={style.searchBar}>
      <img src={searchIcon} className={style.photo} alt="search bar icon" />
      <input
        type="text"
        placeholder="Search here..."
        onChange={handleSearchUsers}
      />
    </div>
  );
}

export default SearchBar;
