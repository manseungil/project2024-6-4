import React from 'react';
import Header from "../component/Header/Header";
import MbtiTest from '../component/MbtiTest/MbtiTest';

const MbtiTestPage = () => {
    return (
        <>
            <Header/>
            <div className='container'>
                <MbtiTest/>
            </div>
        </>
    );
}

export default MbtiTestPage;