import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';

const TotalSettle = () => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    };

    const reportData = [
        { name: "이해솔 외 4명", title: "부산바캉스", date: "2024-07-07" },
        { name: "장서원 외 6명", title: "빠지레츠고", date: "2024-06-07" },
        { name: "변중연 외 3명", title: "삿포로 눈구경", date: "2024-02-07" }
    ];

    return (
        <div className='TotalSettle_Wrap container'>
            <div className="back-button">
                <a onClick={onBack}>
                    <img src={BackIcon} alt="back button" className="back-btn-img" />
                </a>
                <h1>정산결과 모아보기</h1>
            </div>

            <div className="settle-list">
                {reportData.map((report, index) => (
                    <div className="settle-item" key={index}>
                        <div className="settle-name">{report.name}</div>
                        <div className="settle-title">{report.title}</div>
                        <div className="settle-date">{report.date}</div>
                    </div>
                ))}
            </div>

            <div className="bottom-button">
                <button className="view-settle-button">정산결과 모아보기</button>
            </div>
        </div>
    );
};

export default TotalSettle;
