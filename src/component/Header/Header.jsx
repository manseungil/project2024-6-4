import React, { useContext, useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { FaSortDown } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import * as Swal from '../../api/alert';
import { LoginContext } from '../../context/LoginContextProvider';
import './Header.css';


const Header = () =>{

    // ✅ isLogin   : 로그인 여부 - Y(true), N(false)
    // ✅ logout()  : 로그아웃 함수 - setIsLogin(false)
    const { isLogin, logout, userInfo } = useContext(LoginContext);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleClick = () => {
        Swal.alert('로그인이 필요합니다.', "로그인 페이지로 이동합니다.", "warning", () => { navigate("/login") })
    }

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="/img/logo.png" alt="logo" className='logo'/>
                </Link>
                <div className="label-container">
                    <label onClick={() => navigate("/introduction")}>소개</label>
                    <label onClick={() => navigate("/mbtitest")}>MBTI 테스트</label>
                    <label onClick={() => navigate("/matching")}>매칭</label>
                    <label onClick={() => navigate("/chat")}>채팅</label>
                </div>
            </div>
            <div className='label-container'>
                <ul className='menu-list'>
                    {/* 로그인 여부에 따라 조건부 랜더링 */}
                    { !isLogin ? (        
                            <label onClick={handleClick}>
                                <BsPersonCircle style={{fontSize : '35px', color:'black'}}/>
                                <FaSortDown style={{fontSize : '20px', color:'black'}}/>
                            </label>
                    ) : (
                        <>
                                <label onClick={() => navigate('/mypage')}>                            
                                    {userInfo.memberName}님
                                    <BsPersonCircle style={{fontSize : '35px', marginLeft:'5px', marginBottom:'8px'}}/>
                                    <FaSortDown style={{fontSize : '20px', marginBottom:'10px'}}/>  
                                </label>                          
                            <button onClick={() => logout()}>
                                로그아웃
                            </button>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;