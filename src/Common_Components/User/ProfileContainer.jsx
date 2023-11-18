import React from 'react'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'


const ProfileContainer = () => {
  return (
    <div className="edit-profile-container registration-card-wrapper">
            <div className='edit-profile-left-container'>
                <EditProfile/>
            </div>

            <div className='edit-profile-right-container'>
                <ChangePassword/>
            </div>

        </div>
  )
}

export default ProfileContainer