import animeImg from "../../Assets/anime.jpg";
import style from "./Profile.module.css";
import { auth, database } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../Supabase";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  async function handleFileUpload(e) {
    const uploadedFile = e.target.files[0];

    if (!uploadedFile) {
      toast.error("Image wasn't uploaded", {
        position: "top-center",
      });
      return;
    }

    const bucketName = "Images";
    const filePath = `${Date.now()}_${uploadedFile.name}`;

    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, uploadedFile, {
          upsert: false,
        });

      const { data: imgUrl } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setUserDetails((prev) => ({ ...prev, profileImage: imgUrl.publicUrl }));
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  }

  //get user's data
  async function fetchUserData() {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      try {
        const docRef = doc(database, "Users", user.uid);
        if (!docRef) return;
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
    });
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  //function to update user's info in real time
  async function handleSave(e) {
    e.preventDefault();
    const docRef = doc(database, "Users", userDetails.uid);
    if (!docRef) return;
    await updateDoc(docRef, userDetails);
    navigate("/chat");
  }

  function handleUserName(e) {
    setUserDetails((details) => ({ ...details, username: e.target.value }));
  }

  function handleUserBio(e) {
    setUserDetails((details) => ({ ...details, bio: e.target.value }));
  }

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <h3>Profile details</h3>
        <form className={style.profileForm} onSubmit={handleSave}>
          <label>
            <input type="file" onChange={handleFileUpload} /> 
          </label>
          <input
            className={style.text}
            type="text"
            defaultValue={userDetails?.username || ""}
            onChange={handleUserName}
          />
          <textarea
            className={style.textarea}
            defaultValue="Hey, There i am using chat app"
            onChange={handleUserBio}
          />
          <button type="submit">Save</button>
        </form>
      </div>

      <img
        src={userDetails?.profileImage || animeImg}
        alt="anime man"
        className={style.profileImg}
      />
    </div>
  );
}

export default Profile;
