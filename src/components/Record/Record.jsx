<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
=======
import React from 'react';
>>>>>>> e69067fc24b8d5ab09838f8ac75692394df012d9
import BackIcon from '../../assets/img/back_btn/Icon_back.svg';
import Img01 from '../../assets/img/Record/img01.png';
import { useNavigate } from 'react-router-dom';

const Record = () => {
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

<<<<<<< HEAD
    const handleSave = async () => {
        // 멤버 이름 배열로 변환
        const memberNames = selectedMembers.map(member => member.value);
        const category = selectedCategory.length > 0 ? selectedCategory[0].value : '';

        const expenditureData = {
            classification: category,
            receipt: selectedImage, // 실제로는 파일을 업로드하여 서버에 이미지 URL을 받아와야 함
            memo: memo,
            name: memberNames,
            travelId: 1, // 여기에 여행 ID가 필요합니다. 직접 값 수정 가능
            expenditureMoney: amount
        };

        try {
            const response = await axios.post('http://beancp.com:8082/expenditure', expenditureData);
            if (response.status === 200) {
                console.log("지출 내역 생성 성공:", response.data.message);
                setIsEditing(false); // 저장 완료 후, 편집 모드 해제
            }
        } catch (error) {
            console.error("지출 내역 생성 실패:", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const memberOptions = [
        { value: '이해솔', label: '이해솔' },
        { value: '이승원', label: '이승원' },
        { value: '박시윤', label: '박시윤' }
    ];

    const categoryOptions = [
        { value: '교통', label: '교통' },
        { value: '식사', label: '식사' },
        { value: '숙소', label: '숙소' },
        { value: '기타', label: '기타' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #ddd',
            boxShadow: 'none',
            '&:hover': { border: '1px solid #ddd' }
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        multiValue: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px'
        })
    };

    return (
        <div className='Record_wrap container'>
            {/* 상단 헤더 */}
            <div className='back-btn'>
                <a href='javascript:history.back()'>
                    <img src={BackIcon} alt="Back icon" className='back-btn-img'/>
                </a>
                <h1>{isEditing ? '여행 지출 기록하기' : title}</h1>
            </div>

            {/* record-section */}
            <div className={`record-section ${isEditing ? 'editing' : 'saved'}`}>
                {isEditing ? (
                    <>
                        {/* 제목 입력 */}
                        <input 
                            type="text" 
                            className="title-input" 
                            placeholder="제목을 입력하세요" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* 금액 입력 */}
                        <div className="input-field">
                            <input 
                                type="text" 
                                placeholder="지출 금액" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <span className="currency">원</span>
                        </div>

                        {/* 카테고리 드롭다운 */}
                        <div className="dropdown">
                            <label htmlFor="category">카테고리</label>
                            <Select
                                id="category"
                                isMulti
                                options={categoryOptions}
                                value={selectedCategory}
                                onChange={(selectedOptions) => setSelectedCategory(selectedOptions || [])}
                                placeholder="카테고리"
                                styles={customStyles}
                            />
                        </div>

                        {/* 멤버 멀티 셀렉트 */}
                        <div className="dropdown">
                            <label htmlFor="member">멤버</label>
                            <Select
                                id="member"
                                isMulti
                                options={memberOptions}
                                value={selectedMembers}
                                onChange={(selectedOptions) => setSelectedMembers(selectedOptions || [])}
                                placeholder="멤버"
                                styles={customStyles}
                            />
                        </div>

                        {/* 영수증 첨부 */}
                        <div className="receipt">
                            <label htmlFor="receipt">영수증</label>
                            <div className="photo-box">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Receipt" className="uploaded-img" />
                                ) : (
                                    <label htmlFor="file-upload" className="upload-label">
                                        사진 추가
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

                        {/* 메모 입력 */}
                        <div className="memo">
                            <label htmlFor="memo">메모</label>
                            <textarea 
                                id="memo" 
                                rows="4" 
                                placeholder="내용을 입력하세요..."
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* 저장 후 표시할 내용 */}
                        <div className="show-amount">
                            {amount}
                            <span className="currency">원</span>
                            <div className='show-category'>
                                {selectedCategory.map(cat => (
                                    <span key={cat.value} className="category-item">{cat.label}</span>
                                ))}
                            </div>
                        </div>

                        {/* 멤버 표시 */}
                        <div className="show-member">멤버
                            {selectedMembers.map(member => (
                                <span key={member.value} className="member-item">{member.label}</span>
                            ))}
                        </div>

                        <div className="receipt">
                            <label htmlFor="receipt">영수증</label>
                            <div className="photo-box">
                                {selectedImage && (
                                    <img src={selectedImage} alt="Receipt" className="uploaded-img" />
                                )}
                            </div>
                        </div>

                        <div className="memo">
                            <label htmlFor="memo">메모</label>
                            <textarea 
                                id="memo" 
                                rows="4" 
                                value={memo} 
                                readOnly 
                            />
                        </div>
                    </>
                )}
            </div>

            {/* 버튼 영역 */}
            <div className="buttons">
                {isEditing ? (
                    <>
                        <button className="record-button submit" onClick={handleSave}>저장</button>
                        <button className="record-button cancel">취소</button>
                    </>
                ) : (
                    <button className="record-button submit" onClick={handleEdit}>수정하기</button>
                )}
            </div>
=======
    const GoEdit = () => {
        navigation('/record_edit')
    }

    return (
        <div className='Record_wrap container'>
            <div>
                <div className="header">
                    <img src={BackIcon} alt="back button" onClick={() => { onBack() }} />
                    <h2>여행 지출 기록하기</h2>
                </div>
                <div className="main">
                    <div className="cate_wrap">
                        <h1><span>24,000</span>원</h1>
                        <p className="cate">교통</p>
                    </div>
                    <div className="member_wrap">
                        <p>멤버</p>
                        <div>
                            <p className='cate'>이승원</p>
                            <p className='cate'>박시윤</p>
                        </div>
                    </div>
                    <div className="img_wrap">
                        <p>영수증</p>
                        <img src={Img01} alt="" />
                    </div>
                    <div className="memo">
                        <p className='title'>메모</p>
                        <p>숙소에서 테마파크까지 약 40분</p>
                    </div>
                </div>
            </div>
            <button className="button" onClick={() => { GoEdit() }}>수정하기</button>
>>>>>>> e69067fc24b8d5ab09838f8ac75692394df012d9
        </div>
    );
};

export default Record;
