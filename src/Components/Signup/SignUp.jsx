import React, { useState } from 'react';
import './App.css';
import backIcon from './left-arrow.png';
import { useDispatch, useSelector } from 'react-redux';

function SignupForm() {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [isVerificationCodeEntered, setIsVerificationCodeEntered] = useState(false);
    const [isOKButtonClicked, setIsOKButtonClicked] = useState(false);


    const handlenameChange = (event) => {
        setname(event.target.value);
    };



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleEmailVerification = () => {
        //이메일 확인 API여기에 부르고 확인완료되었다면 isEmailVerified를 true로 설정
        setIsEmailVerified(true);
    };

    const handleVerificationCodeSend = () => {
        // 여기에서 확인 코드 전송 API를 호출하고 성공하면 isVerificationCodeSent를 true로 설정
        setIsVerificationCodeSent(true);
    };

    const handleVerificationCodeEntered = () => {
        setIsVerificationCodeEntered(true);
    }

    const handleOKButtonClick = () => {
        setIsOKButtonClicked(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에서 양식 제출 로직 처리
    };

    return (
        <div>
            <header className="header">
                <a href="#" className="back-button">
                    <img src={backIcon} alt="Back" />
                </a>
                <div className="header-title">Carbon Eye</div>
            </header>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup">회원가입</h2>
                <label htmlFor="name" className="inputInfo">이름</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handlenameChange}
                />
                <label htmlFor="email">이메일</label>
                <div className="email-input-container">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {!isEmailVerified && (
                        <button type="button" className="verification-button" onClick={handleEmailVerification}>
                            인증번호
                        </button>
                    )}
                </div>
                {isEmailVerified && (
                    <div>
                        {!isOKButtonClicked && (
                            <>
                                <div className="verificationCode"></div>
                                {!isVerificationCodeEntered && (
                                    <div className="verification-container">
                                        <input
                                            type="verificationCode"
                                            id="verificationCode"
                                            name="verificationCode"
                                            placeholder="인증번호 6자리를 입력하세요."
                                            value={verificationCode}
                                            onChange={handleVerificationCodeChange}
                                        />
                                        {!isVerificationCodeSent && (
                                            <button type="button" className="confirm-button" onClick={handleVerificationCodeSend}>
                                                확인
                                            </button>
                                        )}
                                        {isVerificationCodeSent && (
                                            <button type="button" className="confirm-button" onClick={handleOKButtonClick}>
                                                확인
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
                <label htmlFor="password" className="inputInfo">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <label htmlFor="confirmPassword" className="inputInfo">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {confirmPassword !== password && (
                    <div className="password-error">비밀번호가 다릅니다</div>
                )}
                <div className="signup-cancel-container">
                    <button type="submit" className="signup-button" disabled={confirmPassword !== password}>
                        회원가입
                    </button>
                    <button type="submit" className="cancel-button">
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
