import React, { useContext } from 'react'
import Header from '../component/Header/Header'
import JoinForm from '../component/Join/JoinForm'
import * as auth from '../api/auth';
import * as Swal from '../api/alert';
import { LoginContext } from '../context/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const { login } = useContext(LoginContext);
    const navigate = useNavigate()

    // 회원가입 요청
    const join = async (  userId, userPw, name, email ) => {
        console.log( userId, userPw, name, email);

        try {
            const {statusCode, responseData} = await auth.join( userId, userPw, name, email)

            console.log(`data : ${responseData}`);
            console.log(`status : ${statusCode}`);

            if( statusCode === 200 ) {
                console.log(`회원가입 성공!`);
                Swal.alert("회원가입 성공", "메인 화면으로 이동합니다.", "success", () => { navigate("/") })
            }
            else {
                console.log(`회원가입 실패!`);
                Swal.alert("회원가입 실패", "회원가입에 실패하였습니다.", "error" )
            }

        } catch (error) {
            console.error(`${error}`)
            console.error(`회원가입 요청 중 에러가 발생하였습니다.`);
        }
    }


    return (
        <>
            <Header />
            <div className='container'>
                <JoinForm join={join} />
            </div>
        </>
    )
}

export default Join