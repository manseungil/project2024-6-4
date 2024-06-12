// MyPage.jsx

import React from 'react';
import Header from '../component/Header/Header';
import MyPageForm from "../component/MyPage/MyPageForm";


const MyPage = () => {
    return (
        <>
            <Header/>
            <div className='container'>
                <MyPageForm/>
            </div>
        </>
    );
};

export default MyPage;