import React, { useState, useEffect } from 'react';
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ChartDataLabels);

const Report = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [collectedAmount, setCollectedAmount] = useState('');
    const [originalTotalSpending, setOriginalTotalSpending] = useState(0);
    const [expenditures, setExpenditures] = useState([]);
    const [spendingData, setSpendingData] = useState({
        labels: ['숙소', '식사', '술', '교통', '기타'],
        datasets: [{
            label: '지출 비율',
            data: [0, 0, 0, 0, 0], // 초기값
            backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'],
        }],
    });
    const [totalSpending, setTotalSpending] = useState(0);
    const [mostFrequentCategory, setMostFrequentCategory] = useState('');
    const [memberSpendingData, setMemberSpendingData] = useState([
        { labels: ['숙소', '식사', '술', '교통', '기타'], datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'] }] },
        { labels: ['숙소', '식사', '술', '교통', '기타'], datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'] }] },
        { labels: ['숙소', '식사', '술', '교통', '기타'], datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'] }] }
    ]);

    const daySpendingData = {
        labels: ['1일차', '2일차', '3일차', '4일차', '5일차', '6일차', '7일차'],
        datasets: [
            {
                label: '일별 지출',
                data: [19.8, 20.5, 9.7, 0, 0, 0, 0],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.height);
                    gradient.addColorStop(0, '#0062F5');
                    gradient.addColorStop(1, '#BDD7FF');
                    return gradient;
                },
                barThickness: 40,
                borderRadius: 15,
                borderSkipped: false,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => context.raw.toFixed(1),
                },
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                color: '#868686',
                font: {
                    size: 12,
                },
                formatter: (value) => value === 0 ? '-' : value.toFixed(1), // 값이 0이면 '-'로 표시
                anchor: 'end',
                align: 'top',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: true, // x축 눈금 표시
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
        },
    };

    const handleSettle = () => {
        // 정산 금액과 총 지출액을 로컬 스토리지에 저장
        localStorage.setItem('settledAmount', collectedAmount);
        localStorage.setItem('totalSpending', originalTotalSpending);
        // 정산 페이지로 이동
        navigate('/settle'); 
    };

    

    useEffect(() => {
        const fetchExpenditures = async () => {
            try {
                const response = await axios.get('http://beancp.com:8082/expenditure/travel/4'); // 여행 ID에 따라 수정
                setExpenditures(response.data);
                
                let total = 0;
                const categoryCounts = {};
                response.data.forEach(item => {
                    const classification = item.classification;
                    const amount = item.expenditureMoney;
                    
                    total += amount; // 총합 계산

                    // 카테고리별로 카운트
                    if (categoryCounts[classification]) {
                        categoryCounts[classification]++;
                    } else {
                        categoryCounts[classification] = 1;
                    }
                });
                setOriginalTotalSpending(total);

                // 총 지출액 업데이트 (만원 단위로 변환)
                setTotalSpending(Math.floor(total / 10000)); // 10,000원 단위로 나누어 만원으로 표시

                // 가장 많이 사용된 카테고리 찾기
                const mostFrequent = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);
                setMostFrequentCategory(mostFrequent);

                // 카테고리별 지출 금액 합산
                const categoryTotals = { 숙소: 0, 식사: 0, 술: 0, 교통: 0, 기타: 0 };
                response.data.forEach(item => {
                    const classification = item.classification;
                    const amount = item.expenditureMoney;
                    if (categoryTotals[classification] !== undefined) {
                        categoryTotals[classification] += amount;
                    }
                });

                // 차트 데이터 업데이트
                setSpendingData(prev => ({
                    ...prev,
                    datasets: [{
                        ...prev.datasets[0],
                        data: [
                            categoryTotals['숙소'],
                            categoryTotals['식사'],
                            categoryTotals['술'],
                            categoryTotals['교통'],
                            categoryTotals['기타'],
                        ],
                    }],
                }));

            } catch (error) {
                console.error('지출 내역 가져오기 실패:', error);
            }
        };

        fetchExpenditures();
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='Report_wrap container'>
            <div className='back-btn'>
                <a href='javascript:history.back()'>
                    <img src={BackIcon} alt="Back icon" className='back-btn-img' />
                </a>
                <h1>부산 바캉스</h1>
            </div>
            <div className='chart_wrap'>
                <div className="total-spending-section">
                    <p className="total-spending-title">총 지출액</p>
                    <p className="total-spending-amount">{totalSpending}만원</p> {/* 총 지출액 표시 */}
                </div>

                <div className="chart-container">
                    <div className='chart-section'>
                        <h3 className='chart-title'>{mostFrequentCategory}에 가장 많이 썼어요</h3> {/* 가장 많이 쓴 카테고리 표시 */}
                        <div className='chart'>
                        <Doughnut
    data={spendingData}
    options={{
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
                labels: {
                    color: 'black',
                    font: {
                        size: 12,
                    },
                    padding: 10,
                    boxWidth: 10,
                    boxHeight: 10,
                },
            },
            datalabels: {
                color: '#FFFFFF',
                display: true,
                formatter: (value) => value === 0 ? null : value.toFixed(1), // 값이 0이면 null로 설정
                anchor: 'center',
                align: 'center',
            },
        },
        borderWidth: 0,
    }}
/>

                        </div>
                    </div>

                    <div className="chart-section">
                        <h3 className="chart-title">2일차에 가장 많이 썼어요</h3>
                        <div className="bar-chart">
                            <Bar data={daySpendingData} options={barOptions} />
                        </div>
                    </div>

                    <div className="chart-section">
    <h3 className="chart-title">멤버별 지출을 알려드려요</h3>
    <div className="member-chart-container">
        <div className="member-chart-section">
            <h4>이승원</h4>
            <div className="member-chart">
                <Doughnut
                    data={{
                        labels: ['숙소', '식사', '술', '교통', '기타'],
                        datasets: [{
                            label: '이승원 지출',
                            data: [20, 15, 10, 5, 2],
                            backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'],
                        }],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            datalabels: { display: false }
                        },
                        borderWidth: 0,
                    }}
                />
            </div>
        </div>
        <div className="member-chart-section">
            <h4>박시윤</h4>
            <div className="member-chart">
                <Doughnut
                    data={{
                        labels: ['숙소', '식사', '술', '교통', '기타'],
                        datasets: [{
                            label: '박시윤 지출',
                            data: [18, 12, 8, 6, 4],
                            backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'],
                        }],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            datalabels: { display: false }
                        },
                        borderWidth: 0,
                    }}
                />
            </div>
        </div>
        <div className="member-chart-section">
            <h4>이해솔</h4>
            <div className="member-chart">
                <Doughnut
                    data={{
                        labels: ['숙소', '식사', '술', '교통', '기타'],
                        datasets: [{
                            label: '이해솔 지출',
                            data: [15, 10, 7, 5, 3],
                            backgroundColor: ['#1A75FE', '#4F95FF', '#80B2FF', '#A6C9FF', '#D1E3FF'],
                        }],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            datalabels: { display: false }
                        },
                        borderWidth: 0,
                    }}
                />
            </div>
        </div>
    </div>
</div>

                </div>

                <div className="mvp-section">
                    <div className="profile">
                        <h3>이번 여행 지출 MVP 🏆</h3>
                        <div className="profile-img"></div>
                        <p>이승원님</p>
                        <p className='small-text'>총 2만원으로 가장 많이 지출했어요 🎉</p>
                    </div>
                </div>

                <div className="settle-section">
                    <button className="settle-btn" onClick={() => setModalOpen(true)}>금액 정산하기</button>
                </div>
            </div>


            {modalOpen && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <div className="modal">
                        <div className="modal-content">
                            <p>여행 전 걷은 금액을 입력하세요</p>
                            <p className="small-text">걷은 금액과 지출액을 뺀 정산액을 알려드릴게요</p>

                            <input
                                type="text"
                                className="modal-input"
                                placeholder="숫자만 입력하세요"
                                value={collectedAmount}
                                onChange={(e) => setCollectedAmount(e.target.value)}
                            />
                            <button onClick={closeModal} className="close-btn">✕</button>
                            <button className="complete-btn" onClick={handleSettle}>
                                정산 완료하기
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>);
};

export default Report;
