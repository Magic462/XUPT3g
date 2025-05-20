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
            {!member.company ? (
  // company 为空，占位
  <>
    <p className="people-team">{member.team}组</p>
    <p className="people-company placeholder">&nbsp;</p>
  </>
) : member.company.length > 8 ? (
  // company 太长，合并一行
  <p className="people-team">{member.team}组&nbsp;{member.company}</p>
) : (
  // 正常情况，两行显示
  <>
    <p className="people-team">{member.team}组</p>
    <p className="people-company">{member.company}</p>
  </>
)}


            <p className="people-more">
              <a href="#">
                <span className="people-more-cover"></span>
                <span className="people-more-title">个性签名</span>
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
