import React from 'react';
import Header from "../component/Header/Header";
import HomeForm from '../component/Home/HomeForm';

const Home = () => {
    return (
        <>
            <Header/>
            <div className='container'>
                <HomeForm/>
            </div>
        </>
    );
}

export default Home;