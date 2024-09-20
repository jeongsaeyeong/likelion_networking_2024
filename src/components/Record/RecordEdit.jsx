import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';
import InputImg from '../../assets/img/Record/icons.svg';
import Down from '../../assets/img/Team/down.svg';

const RecordEdit = () => {
    const navigate = useNavigate();
    const expenditureId = 1; // 고정된 expenditureId
    const travelId = 4; // 필요에 따라 travelId 고정
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [memo, setMemo] = useState('');
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchRecordData = async () => {
            try {
                const response = await axios.get(`http://beancp.com:8082/expenditure/details/${expenditureId}`);
                const expenditureData = response.data; // 단일 지출 내역

                if (expenditureData) {
                    setTitle(expenditureData.expenditureName || '');
                    setAmount(expenditureData.expenditureMoney || '');
                    setCategory(expenditureData.classification || '기타');
                    setMemo(expenditureData.memo || '');
                    setMembers(expenditureData.userNames || []);
                }
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };

        fetchRecordData();
    }, []);

    const handleSave = async () => {
        try {
            const expenditureData = {
                expenditureId: expenditureId, // 고정된 expenditureId 사용
                name: members,
                travelId: travelId, // 고정된 travelId 사용
                classification: category || '기타',
                receipt: '', // 영수증 URL 처리 필요
                memo: memo || '',
                expenditureMoney: parseInt(amount) || 0
            };
    
            // 값 출력
            console.log('수정할 지출 내역:', expenditureData);
    
            const response = await axios.put('http://beancp.com:8082/expenditure', expenditureData);
    
            if (response.status === 200) {
                alert('지출 내역 수정 성공');
                navigate(-1); 
            } else {
                console.error('지출 내역 수정 실패', response.statusText);
            }
        } catch (error) {
            console.error('오류 발생', error.response || error.message);
        }
    };
    

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const onBack = () => {
        navigate(-1);
    };

    return (
        <div className='RecordEdit_Wrap container'>
            <div>
                <div className="header">
                    <img src={BackIcon} alt="back button" onClick={onBack} />
                    <h2>여행 지출 기록 수정하기</h2>
                </div>
                <div className="main">
                    <input 
                        className='title' 
                        type="text" 
                        placeholder='제목을 입력하세요' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <div className='pay'>
                        <input 
                            type="text" 
                            placeholder='지출 금액' 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                        <p>원</p>
                    </div>
                    <div className='toggle_wrap'>
                        <label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">카테고리</option>
                                <option value="교통">교통</option>
                                <option value="식사">식사</option>
                                <option value="기타">기타</option>
                                <option value="술">술</option>
                                <option value="숙소">숙소</option>
                            </select>
                            <img src={Down} alt="" />
                        </label>
                        <label>
                            <select multiple value={members} onChange={(e) => setMembers(Array.from(e.target.selectedOptions, option => option.value))}>
                                <option value="변중연">변중연</option>
                                <option value="이승원2">이승원2</option>
                                <option value="이해솔">이해솔</option>
                                <option value="장서원">장서원</option>
                            </select>
                            <img src={Down} alt="" />
                        </label>
                    </div>
                    <div className="receipt">
                        <p>영수증</p>
                        <div className="photo-box">
                            {selectedImage ? (
                                <img src={URL.createObjectURL(selectedImage)} alt="Receipt" className="uploaded-img" />
                            ) : (
                                <label htmlFor="file-upload" className="upload-label">
                                    <div>
                                        <img src={InputImg} alt="" />
                                        <p>사진 추가</p>
                                    </div>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="memo">
                        <p>메모</p>
                        <textarea 
                            placeholder='내용을 입력하세요' 
                            value={memo} 
                            onChange={(e) => setMemo(e.target.value)} 
                        />
                    </div>
                </div>
            </div>
            <div className="btn_box">
                <button className="done" onClick={handleSave}>저장</button>
                <button className="delete" onClick={onBack}>취소</button>
            </div>
        </div>
    );
};

export default RecordEdit;
