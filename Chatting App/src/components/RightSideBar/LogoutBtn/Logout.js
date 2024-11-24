import style from './LogoutBtn.module.css'
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Logout() {
  const navigator = useNavigate()


  async function handleLogout() {
    try{
    await auth.signOut()
    toast.success("Logged out successfully")
    navigator('/login')
} catch(err) {
  toast.error('Failed to Logout')

}



}

function handleProfile() {
  navigator('/profile')

}
  
  
  return (<div className={style.buttons}>
    <div className={style.logout} onClick={handleProfile}>My Profile</div>
    <div className={style.logout} onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default Logout
