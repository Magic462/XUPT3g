import React from 'react';
import './People.scss';

const People = ({ members }) => {
  return (
    <div className="people-container">
      {members.map((member) => (
        <div key={member.id} className="people-comp">
          <div className="people-photo">
            <img src={member.photo} alt={member.name} />
          </div>
          <h2>{member.name}</h2>
          <div className="people-bottom">
          <p>{member.direction}组&nbsp;{member.company}</p>
          <p>{member.message}</p>
          <p><a href="#">了解更多</a></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
