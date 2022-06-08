import { useEffect, useState } from 'react'
import { useAuth } from '../../components/providers/UseAuth'
import { storage } from '../..'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { v4 } from 'uuid'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const { user, ga, db } = useAuth()
  const navigate = useNavigate()
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar)
  const [imageUpload, setImageUpload] = useState(null)
  const [changeName, setChangeName] = useState('')
  const id = String(window.location.href).substring(30)
  const [snapshot, loading, error] = useCollection(collection(db, 'users'))
  const users = snapshot?.docs.map(doc => ({ id: doc.id, userData: doc.data() }))
  const findUser = users?.find(user => user.userData.id == id)

  const uploadImage = async e => {
    if (imageUpload == null) {
      return
    }

    const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`)
    await uploadBytes(imageRef, imageUpload)
      .then(async () => {
        const avatarURL = await getDownloadURL(imageRef)
        updateProfile(ga.currentUser, { photoURL: avatarURL })

        const data = onSnapshot(collection(db, 'users'), document => {
          document.forEach(d => {
            if (d.data().id == user.id) {
              setDoc(doc(db, 'users', d.id), { avatar: avatarURL, id: user.id, name: user.name })
            }
          })
        })
      })
      .catch(err => console.error(err))
  }
  const uploadName = e => {
    updateProfile(ga.currentUser, { displayName: changeName })
    const dataName = onSnapshot(collection(db, 'users'), document => {
      document.forEach(d => {
        if (d.data().id == user.id) {
          setDoc(doc(db, 'users', d.id), { avatar: user.avatar, id: user.id, name: changeName })
        }
      })
    })
  }
  useEffect(() => {
    if (user?.id == id) {
      navigate(`../profile/${id}`)
    }
  }, [id])
  useEffect(() => {
    if (user?.photoURL) {
      setProfileAvatar(user.photoURL)
    }
  }, [user])

  const makeProfile = () => {
    if (user?.id == id) {
      return (
        <div className='user_card'>
          <div className='user_data'>
            <img className='user_avatar' src={profileAvatar} alt='' />
            <h3 className='user_name'>{user?.name}</h3>
          </div>

          <h1 className='edit_page'>Edit Page :</h1>
          <div className='change_avatar'>
            <h3>Change avatar :</h3>
            <input type='file' onChange={e => setImageUpload(e.target.files[0])} />
            <button onClick={uploadImage} className='add_image_button'>
              Upload Avatar
            </button>
          </div>
          <div className='change_name'>
            <h3>Change name :</h3>
            <input
              type='text'
              value={changeName}
              onChange={e => setChangeName(e.target.value)}
              className='change_input'
              placeholder='Write new full name'
            />
            <button onClick={uploadName} className='add_name_button'>
              Change Full Name
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='user_card'>
          <div className='user_data'>
            <img className='user_avatar' src={findUser?.userData.avatar} alt='' />
            <h3 className='user_name'>{findUser?.userData.name}</h3>
          </div>
        </div>
      )
    }
  }

  return <div>{makeProfile()}</div>
}

export default Profile
