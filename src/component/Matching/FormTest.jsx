import React, { useContext, useState, useEffect } from "react";
import { PiArrowsHorizontalBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from 'react-spinners';
import { LoginContext } from '../../context/LoginContextProvider';
import axios from 'axios';
import "./MatchingForm.css";

const MatchingForm = ({ capturedImage }) => {
    const { userInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [matchingStatus, setMatchingStatus] = useState("매칭 중");
    const [matchedUser, setMatchedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        navigate("/");
    }

    const handleRequestMatch = () => {
        axios.get("http://localhost:5002/getRandomUser")
            .then(response => {
                setMatchedUser(response.data);
                setLoading(false);
                if (response.data) {
                    setMatchingStatus("매칭 성공");
                    navigate("/matched", { state: { matchedUser: response.data } });
                } else {
                    setMatchingStatus("매칭된 사용자 없음");
                }
            })
            .catch(error => {
                console.error('Error requesting match:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        handleRequestMatch();
    }, []);

    return (
        <div>
            <div>
                <FadeLoader
                    color="#ED648B"
                    cssOverride={{
                        position: 'absolute',
                        top: '9%',
                        left: '8%'
                    }}
                    height={27}
                    loading={loading}
                    margin={12}
                    radius={3}
                    width={9}
                />
                <p className="matchingimgP">{matchingStatus}</p>
                <button onClick={handleClick} className="matchingbtn">매칭취소</button>
            </div>
            <img src={capturedImage || "/img/profile.png"} alt="프로필" className="matchingimg"/>
            <div className="icon">
                <PiArrowsHorizontalBold/>
            </div>
            <img src="/img/matching.png" alt="matching" className="matchingimg2"/>
        </div>
    )
}

export default MatchingForm;
