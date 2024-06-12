import React from 'react';
import Header from "../component/Header/Header";
import MatchingForm from '../component/Matching/MatchingForm';

const Matching = (props) => {
    return (
        <>
            <Header/>
            <div className='container'>
                <MatchingForm/>
            </div>
        </>
    );
}

export default Matching;