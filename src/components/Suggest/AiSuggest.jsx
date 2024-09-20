import React, { useState } from 'react';
import Back from '../../assets/img/Icon/back.svg';
import Down from '../../assets/img/Icon/down.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AiSuggest = () => {
    const [startyear, setStartYear] = useState("");
    const [startmonth, setStartMonth] = useState("");
    const [startday, setStartDay] = useState("");
    const [backyear, setBackYear] = useState("");
    const [backmonth, setBackMonth] = useState("");
    const [backday, setBackDay] = useState("");
    const [budget, setBudget] = useState("");
    const [people, setPeople] = useState("");

    const navigate console.log("Submitting Data:", { budget, startyear, startmonth, startday, backyear, backmonth, backday, people }); = useNavigate();

    const handleAiSuggest = async () => {
        console.log("Submitting Data:", { budget, startyear, startmonth, startday, backyear, backmonth, backday, people });

        const data = {
            budget: Number(budget),
            startDate: ${startyear}-${String(startmonth).padStart(2, '0')}-${String(startday).padStart(2, '0')},
        endDate: ${backyear}-${String(backmonth).padStart(2, '0')}-${String(backday).padStart(2, '0')},
        numOffPeople: Number(people)
    };

        try {
            const response = await axios.post('http://beancp.com:8082/travel/recommend', data);
            navigate('/aiResult', { state: { results: response.data, ...data } });
        } catch (error) {
            console.error('API 요청 실패:', error);
            alert('API 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const years = Array.from({ length: 10 }, (_, i) => 2033 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const peopleOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className='AiSuggest_wrap container'>
            <div>
                <div className='subHeader'>
                    <button onClick={() => navigate(-1)}>
                        <img src={Back} alt="Back" className='back' />
                    </button>
                    <h1>AI 여행지 추천받기</h1>
                </div>
                <div className="Ai-Box">
                    <div className="budget_wrap">
                        <div className="input_wrap">
                            <input
                                type="number"
                                id="budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="예산을 입력하세요"
                            />
                            <span>원</span>
                        </div>
                    </div>
                    <div className="day">
                        <div className="time_wrap">
                            <div className='start'>
                                <h3>출발</h3>
                                <div className='toggle_wrap'>
                                    <label>
                                        <select value={startyear} onChange={(e) => setStartYear(e.target.value)}>
                                            <option value="">년</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                    <label>
                                        <select value={startmonth} onChange={(e) => setStartMonth(e.target.value)}>
                                            <option value="">월</option>
                                            {months.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                    <label>
                                        <select value={startday} onChange={(e) => setStartDay(e.target.value)}>
                                            <option value="">일</option>
                                            {days.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                </div>
                            </div>
                            <div className='arrival'>
                                <h3>도착</h3>
                                <div className='toggle_wrap'>
                                    <label>
                                        <select value={backyear} onChange={(e) => setBackYear(e.target.value)}>
                                            <option value="">년</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                    <label>
                                        <select value={backmonth} onChange={(e) => setBackMonth(e.target.value)}>
                                            <option value="">월</option>
                                            {months.map((m) => (
                                                <option key={m} value={m}>
                                                    {m}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                    <label>
                                        <select value={backday} onChange={(e) => setBackDay(e.target.value)}>
                                            <option value="">일</option>
                                            {days.map((d) => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={Down} alt="" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="people_wrap">
                        <div className="input_wrap">
                            <select
                                id="people"
                                value={people}
                                onChange={(e) => setPeople(e.target.value)}
                            >
                                <option value="">인원을 설정하세요</option>
                                {peopleOptions.map((p) => (
                                    <option key={p} value={p}>
                                        {p}명
                                    </option>
                                ))}
                            </select>
                            <img src={Down} alt="" />
                        </div>
                    </div>
                    <button className="blueBtn" onClick={handleAiSuggest}> AI 추천 결과 확인하기 </button>
                </div>
            </div>
        </div>
    );
};

export default AiSuggest;