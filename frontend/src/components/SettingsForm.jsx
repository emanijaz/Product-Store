import React, {useEffect, useState} from 'react'

export default function SettingsForm({ userData, handleInputChange, handleSubmit, handleAvatarChange, handleEditIconClick, fileInputRef, children }) {

    return (
    <div>

        <h5>Account Settings</h5>
        <hr/>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <div className='mb-3' style={{ position: 'relative', display: 'inline-block' }}>
                    
                    {children}
                    <input id="upload-avatar" type="file" accept="image/*" style={{ display: 'none' }}  ref={fileInputRef}  onChange={handleAvatarChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="firstName" placeholder="First Name" value={userData?.firstName?.value || ''} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="lastName" placeholder="Last Name" value={userData?.lastName?.value || ''} onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" value={userData?.email?.value || ''} onChange={handleInputChange}/>
            </div>
            <div class="form-group mb-3">
                <label for="phone">Phone</label>
                <input type="tel" class="form-control" id="phone" name="phone" placeholder="Phone" value={userData?.phone?.value || '0000000'} onChange={handleInputChange}/>
            </div>
            <div class="form-row mb-3">
                <div class="form-group col-md-4">
                    <label for="inputGender">Gender</label>
                    <select id="inputGender" class="form-control" name="gender" onChange={handleInputChange} value={userData.gender.value}>
                        <option >Choose...</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>

                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-dark btn-block"
                style={{ 
                    width: '20%', 
                    padding: '10px', 
                    fontSize: '16px', 
                    textAlign: 'center'
                }}
            >
                    Update
            </button>
        </form>
    </div>
)}
