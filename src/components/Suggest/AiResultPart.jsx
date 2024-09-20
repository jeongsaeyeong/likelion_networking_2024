import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Back from '../../assets/img/Icon/back.svg';
import topBtn from '../../assets/img/suggest/topBtn.svg';

const AiResultPart = () => {
    const location = useLocation();
    const { state } = location; // location에서 state 가져오기
    const { budget, startyear, startmonth, startday, backyear, backmonth, backday, people } = state || {}; // state에서 필요한 값 가져오기
    const [detailPlan, setDetailPlan] = useState([]); // 여행 세부 계획 상태
    const navigate = useNavigate();

    // 출발일과 도착일을 Date 객체로 생성
    const startDate = new Date(startyear, startmonth - 1, startday);
    const endDate = new Date(backyear, backmonth - 1, backday);

    // 총 숙박일과 여행일 계산
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) - 1;
    const days = nights + 1;

    // API 호출하여 세부 여행 계획 가져오기
    useEffect(() => {
        const fetchDetailPlan = async () => {
            try {
                const response = await axios.post('http://beancp.com:8082/travel/recommend/detail', {
                    detail: "강원도 속초" // 여행지 정보 하드코딩, 동적으로 처리할 경우 필요에 따라 수정 가능
                });
                console.log("API Response:", response.data); // 응답 확인을 위한 콘솔 로그
                setDetailPlan(response.data); // 응답 데이터를 상태에 저장
            } catch (error) {
                console.error('API 요청 실패:', error);
            }
        };

        fetchDetailPlan();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 페이지 상단으로 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='AiResultPart_wrap container'>
            <div>
                <div className='subHeader'>
                    <button onClick={() => navigate(-1)}>
                        <img src={Back} alt="Back" className='back' />
                    </button>
                    <h1>AI 여행지 추천 결과</h1>
                </div>
                <div className="blueBox">
                    <div className="infoTags">
                        <div className="tag">{budget}원</div>
                        <div className="tag">{nights}박 {days}일</div>
                        <div className="tag">{people}명</div>
                    </div>
                </div>
                <div className="detailBox">
                    {detailPlan.map((detail, index) => (
                        // 각 세부 여행 계획을 <p> 태그로 출력
                        <p key={index}>{detail}</p>
                    ))}
                </div>
                <div className="buttons">
                    <button className="blueBtnWide" onClick={() => navigate('/team')}>여행 떠날 그룹 생성하기</button>
                </div>
                <button className="topBtn" onClick={scrollToTop}>
                    <img src={topBtn} alt="Top" />
                </button>
            </div>
        </div>
    );
};

export default AiResultPart;
