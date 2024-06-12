import { useNavigate } from "react-router-dom";
import "./HomeForm.css";
import React from "react";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContextProvider";

const HomeForm = () => {
    const { isLogin, logout, userInfo } = useContext(LoginContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="h1">MY BEST TYPE IMAGE<br/>
                나와 가장 잘 맞는 사람
            </h1>
            {!isLogin ?
                <button onClick={() => navigate("/login")} className="btnlogin">
                    <label style={{cursor:"pointer"}}>로그인</label>
                </button>
                :
                <button onClick={() => navigate("/matching")} className="btnlogin">
                    <label style={{cursor:"pointer"}}>매칭 바로가기</label>
                </button>
            }
            <div>
                <img src="/img/main.png" alt="main" className="img"/>
            </div>
        </div>
    );
};

export default HomeForm;
