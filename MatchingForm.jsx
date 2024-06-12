import React, { useState, useContext } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from 'react-spinners';
import { LoginContext } from '../../context/LoginContextProvider';
import axios from 'axios';

const MatchingForm = () => {
    const { userInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [matchingStatus, setMatchingStatus] = useState("매칭 중");
    const [matchedUser, setMatchedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        navigate("/");
    }

    const handleRequestMatch = () => {
        setLoading(true);
        axios.get("http://localhost:5002/getRandomUser")
            .then(response => {
                const randomUser = response.data;
                setMatchedUser(randomUser);
                setLoading(false);
                if (randomUser) {
                    setMatchingStatus("매칭 성공");
                } else {
                    setMatchingStatus("매칭된 사용자 없음");
                }
            })
            .catch(error => {
                console.error('Error requesting match:', error);
                setLoading(false);
            });
    }

    const handleAccept = () => {
        navigate("/matched", { state: { matchedUser } });
    };

    return (
        <div>
            <span className="userid">
                <IoPersonSharp style={{fontSize: '30px'}}/>
                {userInfo.memberName}님 환영합니다.
            </span>
            <img src="/img/matching.png" alt="matching" className="matchingimg"/>
            <FadeLoader
                color="#ED648B"
                cssOverride={{
                    position: 'absolute',
                    top: '9%',
                    left: '60%'
                }}
                height={27}
                loading={loading}
                margin={12}
                radius={3}
                width={9}
            />
            <p className="matchingimgP">{matchingStatus}</p>
            <div>
                {!matchedUser && <button onClick={handleRequestMatch} className="matchingbtn">매칭 요청</button>}
                <button onClick={handleClick} className="matchingbtn">매칭 취소</button>
            </div>
            {matchedUser && (
                <div className="userinfo">
                    <IoPersonSharp style={{marginBottom:'6px'}}/>
                    <label>ID: {matchedUser.login_id}</label>
                    <label>이름: {matchedUser.member_name}</label>
                    <label>생년월일: {new Date(matchedUser.birth).toLocaleDateString()}</label>
                    <label>성별: {matchedUser.gender}</label>
                    <label>MBTI: {matchedUser.mbti}</label>
                    <label>소개: {matchedUser.intro}</label>
                </div>
            )}
        </div>
    )
}

export default MatchingForm;
