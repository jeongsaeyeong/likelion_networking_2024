import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';
import InputImg from '../../assets/img/Record/icons.svg';
import Down from '../../assets/img/Team/down.svg';

const RecordCreate = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [memo, setMemo] = useState('');
    const [members, setMembers] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSave = async () => {
        try {
            // 지출 내역 데이터
            const expenditureData = {
                expenditureName: title,  // 제목을 'expenditureName'으로 설정
                classification: category || '기타',
                receipt: '', // 지출 생성 시 영수증 URL은 비어있습니다.
                memo: memo || '',
                name: members,  // 멤버 목록을 배열로 설정
                travelId: 4,  // 실제 ID로 변경해야 합니다.
                expenditureMoney: parseInt(amount) || 0
            };
    
            // 지출 내역 데이터 로그 출력
            console.log('저장할 지출 내역 데이터:', expenditureData);
    
            // 지출 내역 POST 요청
            const response = await axios.post('http://beancp.com:8082/expenditure', expenditureData);
            const expenditureId = response.data.expenditureId;  // 서버로부터 받은 expenditureId
    
            console.log('Response Status:', response.status);
            console.log('Response Data:', response.data);
    
            if (response.status === 200 || response.status === 201) {  // 201도 성공 상태로 처리
                console.log('지출 내역 생성 성공');
                
                // 영수증 업로드
                let receiptUrl = '';
                if (selectedImage) {
                    const formData = new FormData();
                    formData.append('file', selectedImage);
    
                    // 업로드 URL (서버의 이미지 업로드 엔드포인트)
                    const uploadUrl = `http://beancp.com:8082/upload-image/${expenditureId}`;
                    console.log('영수증 업로드 URL:', uploadUrl);
    
                    // 영수증 업로드 요청
                    const uploadResponse = await axios.post(uploadUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
    
                    // 업로드된 이미지의 URL을 획득합니다.
                    receiptUrl = uploadResponse.data.url; // 실제 URL 얻기 방법은 API 문서 참조
    
                    console.log('영수증 업로드 성공');
                }
    
                // 지출 내역 업데이트 (영수증 URL 포함)
                if (receiptUrl) {
                    // 지출 내역 PUT 요청 데이터 출력
                    console.log('지출 내역 업데이트 데이터:', {
                        expenditureId,
                        receipt: receiptUrl
                    });
    
                    await axios.put('http://beancp.com:8082/expenditure', {
                        expenditureId,
                        receipt: receiptUrl
                    });
                    console.log('지출 내역 업데이트 성공');
                }
    
                navigate('/record'); // 성공 시 이전 페이지로 돌아가기
            } else {
                console.error('지출 내역 생성 실패', response.statusText);
            }
        } catch (error) {
            console.error('오류 발생', error.response || error.message);
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
                    <h2>여행 지출 기록하기</h2>
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

export default RecordCreate;
