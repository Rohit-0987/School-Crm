import React, { useState, useEffect } from 'react';
import ToggleGroup from '../components/ToggleGroup';
import MonthlyBarChart from '../components/MonthlyBarChart';
import YearlyBarChart from '../components/YearlyBarChart';
import Loading from '../components/Loading'; 
import { BASE_URL } from '../assets/baseUrl';

function ProfitAnalysis() {
    const [loading, setLoading] = useState(true); 
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [chartType, setChartType] = useState('month');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(BASE_URL+`/api/teacher/getTeacherSalariesSum`);
            const response2 = await fetch(BASE_URL+`/api/student/getStudentFeesSum`);
            const data = await response.json();
            const data2 = await response2.json();
            setData(data.sum);
            setData2(data2.sum);
            setLoading(false); 
        } catch (error) {
            
        }
    };

    const handleChartTypeChange = (event, newChartType) => {
        setChartType(newChartType);
    };

    if (loading) {
        return <Loading />; 
    }

    return (
        <div>
            <ToggleGroup value={chartType} onChange={handleChartTypeChange} />
            {chartType === 'month' ? (
                <MonthlyBarChart sum={data} fees={data2} />
            ) : (
                <YearlyBarChart sum={data} fees={data2} />
            )}
        </div>
    );
}

export default ProfitAnalysis;

