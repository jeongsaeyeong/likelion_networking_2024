import React, { useEffect, useState } from 'react';
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';
import InputImg from '../../assets/img/Record/icons.svg'
import { useNavigate } from 'react-router-dom';
import Down from '../../assets/img/Team/down.svg'

const RecordEdit = () => {
    const navigation = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='RecordEdit_Wrap container'>
            <div>
                <div className="header">
                    <img src={BackIcon} alt="back button" onClick={() => { onBack() }} />
                    <h2>여행 지출 기록하기</h2>
                </div>
                <div className="main">
                    <input className='title' type="text" placeholder='제목을 입력하세요' />
                    <div className='pay'>
                        <input type="text" placeholder='지출 금액' />
                        <p>원</p>
                    </div>
                    <div className='toggle_wrap'>
                        <label>
                            <select >
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
                            <select >
                                <option value="">멤버</option>
                                <option value="교통">이승원</option>
                                <option value="식사">임해솔</option>
                                <option value="기타">장서원</option>
                            </select>
                            <img src={Down} alt="" />
                        </label>
                    </div>
                    <div className="receipt">
                        <p>영수증</p>
                        <div className="photo-box">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Receipt" className="uploaded-img" />
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
                        <textarea placeholder='내용을 입력하세요'></textarea>
                    </div>
                </div>
            </div>
            <div className="btn_box">
                <button className="done">저장</button>
                <button className="delete">취소</button>
            </div>
        </div>
    )
}

export default RecordEdit