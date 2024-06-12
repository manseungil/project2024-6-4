import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';
import './MatchedForm.css';

const MatchedForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { matchedUser } = location.state;

    const handleCancel = () => {
        navigate("/matching");
    }

    const handleClick = () => {
        navigate("/chat");
    }

    return (
        <div>
            <div>
                <p className="matchedP">
                    <FaCheck />
                    매칭 성공!
                </p>
                <button onClick={handleClick} className="clickbtn">수락</button>
                <button onClick={handleCancel} className="cancelbtn">거절</button>
            </div>
            <img src="/img/matching.png" alt="matched" className="matchedimg" />
            <li className="info">
                <label className="infoP">
                    <IoPersonSharp style={{ marginBottom: '6px' }} />
                    사용자 정보
                </label>
                <label className="infoLabel">ID: {matchedUser.login_id}</label>
                <label className="infoLabel">이름: {matchedUser.member_name}</label>
                <label className="infoLabel">생년월일: {new Date(matchedUser.birth).toLocaleDateString()}</label>
                <label className="infoLabel">성별: {matchedUser.gender}</label>
                <label className="infoLabel">MBTI: {matchedUser.mbti}</label>
                <label className="infoLabel">소개: {matchedUser.intro}</label>
            </li>
        </div>
    );
};

export default MatchedForm;
