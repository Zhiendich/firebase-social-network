import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { useAuth } from '../../components/providers/UseAuth'
import { storage } from '../..'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { v4 } from 'uuid'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'

const Profile = () => {
  const { user, ga, db } = useAuth()
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar)
  const [imageUpload, setImageUpload] = useState(null)
  const [changeName, setChangeName] = useState('')

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
    if (user?.photoURL) {
      setProfileAvatar(user.photoURL)
    }
  }, [user])

  return (
    <div>
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
      <Loader />
    </div>
  )
}

export default Profile
