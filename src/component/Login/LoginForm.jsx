import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContextProvider';
import './LoginForm.css';
import Find from "../Find/Find";
import {alert} from "../../api/alert";
import {join, checkId} from "../../api/auth";

const LoginForm = () => {
    const { login } = useContext(LoginContext);
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [show, setShow] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };


    const handleShow = () => {
        setShow(true);
    };

    const onJoin = (e) => {
        e.preventDefault()
        const id = e.target.id.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        const mbti = e.target.mbti.value
        const username = e.target.username.value
        const birth = e.target.date.value
        const man = e.target.man.value
        const phone = e.target.phone.value
        const gender = man == 1 ? "남" : "여";
        const res = join(id, password, mbti, username, birth, gender, phone);
        if(res.statusCode == 200){
            alert('회원가입 성공!');
        }
        else{
            alert('회원가입 실패!');
        }
        const user = { id, password, confirmPassword, mbti, username, birth, gender, phone };
        //login(user);
    }

    const onLogin = (e) => {
        e.preventDefault();
        const id = e.target[0].value;
        const password = e.target[1].value;
        
        let res = login(id, password);
    }

    const checkPasswordMatch = async()=>{
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const username = document.getElementById('username').value;
        const date = document.getElementById('date').value;
        const phone = document.getElementById('phone').value;
        const mbti = document.getElementById('mbti').value;
        const id = document.getElementById('id').value;
        const man = document.getElementById('man').value;
        const gender = man==1 ? "남" : "여";
        if (id === ''){
            alert('아이디를 입력해주세요.');
        } else if(password === '' || confirmPassword === ''){
            alert('비밀번호를 입력해주세요.');
        } else if(password !== confirmPassword){
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        } else if(mbti === ''){
            alert('MBTI를 입력해주세요.');
        } else if(username === ''){
            alert('이름을 입력해주세요.');
        } else if (date === ''){
            alert('생년월일을 입력해주세요.');
        } else if(phone === ''){
            alert('휴대폰 번호를 입력해주세요.');
        } else {
            const res = await join(id, password, mbti, username, date, gender, phone);
            if(res.statusCode == 200){
                alert('회원가입 성공!');
            }
            else{
                alert('회원가입 실패!');
            }
        }

    }

    const checkDuplicate= async () => {
        try{
            const id = document.getElementById('id').value;

            if(id === '') {
                alert('아이디를 입력해주세요.');
                return;
            }
            //id 확인 요청
            let res = await checkId(id);
            if(res.statusCode == 200){
                alert('사용 가능한 아이디입니다.');
            } 
            else{
                alert('이미 사용중인 아이디입니다.');
            }
        }
        catch (error){
            alert('이미 사용중인 아이디입니다.');
        }

    }

    return (
        <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form action="" >
                    <label style={{fontSize: "25px"}}>회원정보 입력</label>
                    <p style={{marginTop : '-3px'}}>회원 가입을 위해 필요한 정보를 입력해주세요.</p>
                    <label style={{marginRight: '330px'}}>필수 항목 ✔</label>
                    <fieldset className='fieldset-style'>
                        <div className='label-input-container'>
                            <label>아이디 ✔</label>
                            <input id="id" type="text" placeholder="ID" required/>
                        </div>
                        <button className='button' onClick={checkDuplicate}>중복확인</button>

                        <div className='label-input-container'>
                            <label>비밀번호 ✔</label>
                            <input id="password" type="password" placeholder="Password" required/>
                        </div>
                        <div className='label-input-container'>
                            <label>비밀번호 확인 ✔</label>
                            <input id="confirmPassword" type="password" placeholder="Password" required/>
                        </div>
                        <div className='label-input-container'>
                            <label>MBTI ✔</label>
                            <input id="mbti" type="text" placeholder="MBTI" required/>
                        </div>
                    </fieldset>
                    <br/>
                    <fieldset className='fieldset-style'>
                        <div className='label-input-container'>
                                <label>이름</label>
                                <input id='username' type="text" placeholder="Name" required/>
                            </div>
                            <div className='label-input-container'>
                                <label>생년월일</label>
                                <input id='date' type="date" required/>
                            </div>
                            <div className="radio-container">
                                <label>성별</label>
                                <input type="radio" id="man" name="drone" value="1"/> 남자
                                <p className='label-input-container' style={{marginRight: '10px'}}></p>
                                <input type="radio" id="woman" name="drone" value="2"/>여자
                            </div>
                            <div className='label-input-container'>
                                <label>휴대폰 번호</label>
                                <input id='phone' type="tel" placeholder="Phone" required/>
                            </div>
                        </fieldset>
                    <br/>
                        <button type='submit' onClick={checkPasswordMatch}>Sign Up!!</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="" onSubmit={(e) => onLogin(e)}>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <br/>
                    <input style={{width : '400px'}} type="text" placeholder="ID"/>
                    <input style={{width : '400px'}} type="password" placeholder="Password"/>
                    <br/>
                    <Find/>
                    <br/>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm