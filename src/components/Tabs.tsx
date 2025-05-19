import React, { useState, useEffect } from 'react';
import './Tabs.scss'; // 引入样式文件

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // 默认选中第一个标签
  const [maxVisibleTabs, setMaxVisibleTabs] = useState(6); // 初始设置最大可见标签数
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 控制下拉菜单的显示与隐藏

  useEffect(() => {
    const handleResize = () => {
      // 当窗口宽度小于等于768px时，设置最大可见标签数为3
      if (window.innerWidth <= 768) {
        setMaxVisibleTabs(2);
      } else {
        setMaxVisibleTabs(6);
      }
    };

    // 初始检查
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 清理监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 分离可见标签和更多标签
  const visibleTabs = tabs.slice(0, maxVisibleTabs);
  const additionalTabs =
    tabs.length > maxVisibleTabs ? tabs.slice(maxVisibleTabs) : [];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab); // 通知父组件选中的年份或方向
    setIsDropdownVisible(false); // 点击菜单项后隐藏下拉菜单
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {visibleTabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : 'no-active'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
        {additionalTabs.length > 0 && (
          <div className="more-tab" onClick={toggleDropdown}>
            更多
            {isDropdownVisible && (
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
            )}
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
