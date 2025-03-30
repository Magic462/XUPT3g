import React from'react';
import './Memlist.scss'

interface MemlistProps {
    username: string;
    name: string;
    team: string;
    graduateImg: string;
    signature: string;
    status: number;
}

const Memlist: React.FC<MemlistProps> = ({ username, name, team, graduateImg, signature, status }) => {
    return (
        <div className="mem-item">
            <div className="mem-img-container">
                <img src={graduateImg} alt={username} className="mem-img" />
            </div>
            <div className="mem-info">
                <div className="mem-name-status">
                    <span className="mem-name">{name}</span>
                    {status === 0 && <span className="mem-status-label">已毕业</span>}
                </div>
                <div className="mem-signature">{signature}</div>
                <div className="mem-team">{team}</div>
            </div>
            {status === 0 ? <div className="mem-buttons">
                <button className="view-button">查看</button>
                <button className="delete-button">删除</button>
            </div>:<button className="blog-button">个人博客</button>}
        </div>
    );
};

export default Memlist;