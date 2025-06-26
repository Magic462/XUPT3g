import React, { useState } from 'react';
import './People.scss';
import type { Members } from '@/types/members'

// interface Members {
//   uid: number;
//   name: string;
//   team: string;
//   company?: string;
//   signature?: string;
//   [key: string]: string | number | undefined;
// }

interface PeopleProps {
  members: Members[];
  imgKey?: 'graduateImg' | 'mienImg';
}


const People: React.FC<PeopleProps> = ({ members, imgKey = 'mienImg' }) => {
  const [showSignatureCard, setShowSignatureCard] = useState<number | null>(
    null
  );

  const handleSignatureClick = (uid: number) => {
    setShowSignatureCard((prev) => (prev === uid ? null : uid));
  };

  return (
    <div className="people-container">
      {members.map((member) => (
        <div key={member.uid} className="people-comp">
          <div className="people-photo">
            <img
              src={String(member[imgKey] || '')}
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
              <p className="people-team">
                {member.team}组&nbsp;{member.company}
              </p>
            ) : (
              // 正常情况，两行显示
              <>
                <p className="people-team">{member.team}组</p>
                <p className="people-company">{member.company}</p>
              </>
            )}

            {/* <p className="people-more">
              <a href="#">
                <span className="people-more-cover"></span>
                <span className="people-more-title">个性签名</span>
              </a>
            </p> */}
            <p className="people-more">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignatureClick(member.uid);
                }}
              >
                <span className="people-more-cover"></span>
                <span className="people-more-title">个性签名</span>
              </a>
            </p>
          </div>
          {showSignatureCard === member.uid && (
            <div className="people-signature">
              <p>{member.signature || '这个人目前还没有说什么...'}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default People;
