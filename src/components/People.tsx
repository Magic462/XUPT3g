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
            <p className="people-team">
              {member.direction}组&nbsp;{member.company}
            </p>
            <p className="people-signature">{member.message}</p>
            <p className="people-more">
              <a href="#">
                <span className="people-more-cover"></span>
                <span className="people-more-title">了解更多</span>
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
