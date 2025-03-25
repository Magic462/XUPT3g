import React from 'react';
import './People.scss'

const People = ({ members }) => {
    return (
        <div className='people-container'>
        {members.map((member) => (
            <div key={member.id} className='people-comp'>
                <img src={member.photo} alt={member.name}></img>
                <div className="people-content">
                    <div className='people-name'>{member.name}</div>
                    <div className='people-direction'>{member.direction}方向&nbsp;{member.company}</div>
                    <div className='people-text'>{member.message}</div>
                </div>
            </div>
        ))}
    </div>
    );
};

export default People;