import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContextProvider';
import './MypageForm.css';

const MyPageForm = () => {
    const { userInfo } = useContext(LoginContext);
    const [user, setUser] = useState({
        name: userInfo?.userName || '',
        gender: '',
        birth: '',
        mbti: '',
        profilePictureUrl: '',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };

    return (
        <div className="mypage-container">
            <form onSubmit={handleSubmit}>
            <img className="profile-picture" src="/img/프로필.webp" alt="Profile Picture" />
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name" value={user.name} onChange={handleChange} /><br/>

                <label htmlFor="gender">성별:</label>
                <input type="text" id="gender" name="gender" value={user.gender} onChange={handleChange} /><br/>

                <label htmlFor="birthdate">생년월일:</label>
                <input type="date" id="birthdate" name="birthdate" value={user.birthdate} onChange={handleChange} /><br/>

                <label htmlFor="mbti">MBTI:</label>
                <input type="text" id="mbti" name="mbti" value={user.mbti} onChange={handleChange} /><br/>

                <label htmlFor="profilePictureUrl">프로필 사진 URL:</label>
                <input type="text" id="profilePictureUrl" name="profilePictureUrl" value={user.profilePictureUrl} onChange={handleChange} /><br/>

                <label htmlFor="bio">내 소개:</label>
                <textarea id="bio" name="bio" value={user.bio} onChange={handleChange}></textarea><br/>

                <button type="submit">저장</button>
            </form>
        </div>
    );
};

export default MyPageForm;