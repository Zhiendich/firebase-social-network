import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../components/loader/Loader'
import { useAuth } from '../../components/providers/UseAuth'
import { storage } from '../..'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { v4 } from 'uuid'

const Profile = () => {
  const { user, ga, db } = useAuth()
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar)
  const [imageUpload, setImageUpload] = useState(null)

  const uploadImage = async e => {
    if (imageUpload == null) {
      return
    }

    const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`)
    await uploadBytes(imageRef, imageUpload).then(async () => {
      const photoURL = await getDownloadURL(imageRef)
      updateProfile(user, { photoURL: photoURL })
      console.log(user.photoURL)
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
        <img className='user_avatar' src={profileAvatar} alt='' />
        <h3 className='user_name'>{user?.name}</h3>
        <input type='file' onChange={e => setImageUpload(e.target.files[0])} />
        <button onClick={uploadImage} className='add_image_button'>
          Добавить картинку
        </button>
      </div>
      <Loader />
    </div>
  )
}

export default Profile
