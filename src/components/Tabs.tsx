import React, { useState } from 'react';
import './Tabs.scss'; // 引入样式文件

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // 默认选中第一个标签
  const maxVisibleTabs = 6; // 设置最大可见标签数

  // 分离可见标签和更多标签
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const additionalTabs =
    tabs.length > maxVisibleTabs ? tabs.slice(maxVisibleTabs) : [];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // 通知父组件选中的年份
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {visibleTabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
        {additionalTabs.length > 0 && (
          <div className="more-tab">
            更多
            <div className="more-dropdown">
              {additionalTabs.map((tab) => (
                <div
                  key={tab}
                  className="more-item"
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="tab-content">
        {/* <h2>{activeTab}</h2> */}
        {/* 这里可以根据 activeTab 显示具体内容 */}
      </div>
    </div>
  );
};

export default Tabs;
