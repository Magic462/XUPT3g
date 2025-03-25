import React, { useState } from 'react';
import './Tabs.scss'; // 引入样式文件

const Tabs = ({ years, onYearChange  }) => {
    const [activeTab, setActiveTab] = useState(years[0]); // 默认选中第一个标签
    const maxVisibleTabs = 3; // 设置最大可见标签数

    // 分离可见标签和更多标签
    const visibleTabs = years.slice(0, maxVisibleTabs);
    const additionalTabs = years.length > maxVisibleTabs ? years.slice(maxVisibleTabs) : [];


    const handleTabClick = (year) => {
        setActiveTab(year);
        onYearChange(year); // 通知父组件选中的年份
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                {visibleTabs.map((year) => (
                    <div
                        key={year}
                        className={`tab ${activeTab === year ? 'active' : ''}`}
                        onClick={() => handleTabClick(year)}
                    >
                        {year}
                    </div>
                ))}
                {additionalTabs.length > 0 && (
                    <div className="more-tab">
                        更多
                        <div className="more-dropdown">
                            {additionalTabs.map((year) => (
                                <div
                                    key={year}
                                    className="more-item"
                                    onClick={() => handleTabClick(year)}
                                >
                                    {year}
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