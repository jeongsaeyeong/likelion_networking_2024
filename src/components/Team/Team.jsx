import React, { useState } from 'react'
import Back from '../../assets/img/Team/back.svg'
import Down from '../../assets/img/Team/down.svg'
import TeamPop from './TeamPop'
import { useNavigate } from 'react-router-dom'

const Team = () => {
    const [startyear, setStartYear] = useState("");
    const [startmonth, setStartMonth] = useState("");
    const [startday, setStartDay] = useState("");
    const [backyear, setBackYear] = useState("");
    const [backmonth, setBackMonth] = useState("");
    const [backday, setBackDay] = useState("");
    const [memo, setMemo] = useState('');
    const [popup, setPopup] = useState(false);
    const navigation = useNavigate();

    const years = Array.from({ length: 10 }, (_, i) => 2033 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Team_wrap container'>
            <div>
                <div className="header">
                    <img src={Back} alt="back button" onClick={() => { onBack() }} />
                    <h2>그룹 생성하기</h2>
                </div>
                <div className="main">
                    <input type="text" placeholder='여행 이름을 입력하세요' />
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
                            <div className='comeback'>
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
                    <div className="memo_wrap">
                        <h3>도착</h3>
                        <textarea value={memo} onChange={(e) => { setMemo(e.target.value) }} type="text" className="memo" placeholder='내용을 입력하세요' />
                        <p>0/100</p>
                    </div>
                </div>
            </div>
            <div className="btn_box">
                <button className="done" onClick={() => { setPopup(true) }}>그룹 생성 완료하기</button>
                <button className="delete" onClick={() => { onBack() }} >취소</button>
            </div>
            {popup ? (
                <TeamPop setPopup={setPopup} />
            ) : (<></>)}
        </div>
    )
}

export default Team