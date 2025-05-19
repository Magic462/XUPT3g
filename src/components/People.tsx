import React from 'react';
import './People.scss';

interface PeopleProps {
  members: Members[];
  imgKey?: 'graduateImg' | 'mienImg';
}

// const People = ({ members }) => {

const People: React.FC<PeopleProps> = ({ members, imgKey = 'mienImg' }) => {
  return (
    <div className="people-container">
      {members.map((member) => (
        <div key={member.uid} className="people-comp">
          <div className="people-photo">
            <img
              // src={member.graduateImg || member.mienImg}
              src={member[imgKey] || ''}
              alt={member.name}
              loading="lazy"
            />
          </div>
          <h2>{member.name}</h2>
          <div className="people-bottom">
            <p className="people-team">
              {member.team}组&nbsp;{member.company}
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
