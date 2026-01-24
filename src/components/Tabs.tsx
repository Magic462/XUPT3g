import React, { useState, useEffect } from 'react';
import './Tabs.scss';

/**
 * 根据窗口宽度计算最大可见 tab 数
 * ⚠️ 必须在初始化阶段就算对
 */
const getMaxVisibleTabs = () => {
  const w = window.innerWidth;
  if (w <= 345) return 0;
  if (w <= 768) return 1;
  return 6;
};

const Tabs = ({ tabs = [], onTabChange }) => {
  // ✅ 初始化就使用正确的响应式值
  const [maxVisibleTabs, setMaxVisibleTabs] = useState(getMaxVisibleTabs);

  const [displayTabs, setDisplayTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  /**
   * 监听窗口 resize
   */
  useEffect(() => {
    const handleResize = () => {
      setMaxVisibleTabs(getMaxVisibleTabs());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * tabs 变化时同步内部状态
   * ⚠️ 移动端首次进入 + 异步数据非常关键
   */
  useEffect(() => {
    if (!tabs || tabs.length === 0) return;

    setDisplayTabs([...tabs]);
    setActiveTab(tabs[0]);
    onTabChange?.(tabs[0]);
  }, [tabs]);

  const visibleTabs = displayTabs.slice(0, maxVisibleTabs);
  const additionalTabs =
    displayTabs.length > maxVisibleTabs
      ? displayTabs.slice(maxVisibleTabs)
      : [];

  const handleTabClick = (tab) => {
    const isAdditionalTab = additionalTabs.includes(tab);

    if (isAdditionalTab) {
      setDisplayTabs([tab, ...displayTabs.filter((t) => t !== tab)]);
    }

    setActiveTab(tab);
    onTabChange?.(tab);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((v) => !v);
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
                    className={`more-item ${activeTab === tab ? 'active' : ''}`}
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

      <div className="tab-content">{/* 根据 activeTab 渲染内容 */}</div>
    </div>
  );
};

export default Tabs;
