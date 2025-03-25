import React from 'react';
import Tabs from '../../components/Tabs';

const Graduate = () => {
    const years = ['2020', '2021', '2022', '2023', '2024', '2025']; // 从后端获取的年份数据

    return (
        <div>
            <Tabs years={years} />
        </div>
    );
};

export default Graduate;