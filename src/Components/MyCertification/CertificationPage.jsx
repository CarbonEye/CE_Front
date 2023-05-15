import { useState } from "react";
import { useCallback, useRef } from "react";
import React from "react";
import axios from "axios";
import { months } from "utils/months";
import styled from "styled-components";
import "./CertificationPage.scss";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopText = styled.div`
  color: black;
  font-size: 2vh;
  font-weight: bold;
  margin-left: 4vh;
  margin-top: 4vh;
`;

const DateBox = styled.input`
  padding-left: 6vh;
  padding-right: 3vh;
  border: none;
  background-color: transparent;
  font-size: 1.2vh;
`;
const TodayDate = styled.div`
  padding-left: 6vh;
  padding-right: 3vh;
  font-size: 1.2vh;
`;
//

const GreyLine = styled.div`
  border-bottom: 0.3lvh solid #061941;
  opacity: 0.1;
  margin-top: 2vh;
  margin-left: 4vh;
  margin-right: 4vh;
`;

const TableWrapper = styled.div`
  margin-left: 4vh;
  margin-right: 4vh;
  margin-top: 5vh;
  display: flex;
  font-weight: bold;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GreyWrapper = styled.div`
  margin-left: 4vh;
  margin-right: 4vh;
  margin-top: 3vh;
  line-height: 5vh;
  border-radius: 1vw;
  background-color: #edeff7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableCell = styled.div`
  padding-left: 3vh;
  padding-right: 3vh;
  font-size: 1.6vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameTableCell = styled.div`
  padding-left: 3vh;
  font-size: 1vh;
  justify-content: center;
  align-items: center;
  padding-right: 4vh;
`;

const InputTableCell = styled.div`
  padding-left: 4vh;
  font-size: 1vh;
  justify-content: center;
  align-items: center;
`;

const DateTableCell = styled.div`
  padding-left: 4vh;
  font-size: 1vh;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled.div`
  height: 5vh;
  margin-left: 4vh;
  margin-right: 4vh;
  margin-top: 5vh;
  color: black;
  font-size: 4vh;
  line-height: 5vh;
  background-color: #edeff7;
  border-radius: 1vh;
  text-align: center;
`;

//For 사진 업로드
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2vh;
  padding-left: 3vh;
`;

const ImgInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 2.5vh;
`;

function Certification() {
  const [inputs, setInputs] = useState({
    DateInput: "",
  });

  const [count, setCount] = useState(1);

  const handleAddBox = () => {
    setCount(count + 1);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //For 사진 업로드
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadText, setUploadText] = useState("사진 선택");

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        setUploadText(""); //사진 업로드 하면 글자 없어짐
        resolve();
      };
    });
  };
  //
  //
  const getDate = () => {
    let now = new Date(); // 현재 날짜 및 시간
    let todayDate = now.getDate();
    const curMonth = months[now.getMonth()].name;

    return curMonth + ", " + todayDate;
  };
  //

  return (
    <MainWrapper>
      <TopText>일일 인증 최소 1회 이상</TopText>
      <GreyLine></GreyLine>
      <TableWrapper>
        <TableCell>이름{/* 여기에 이름 들어감 */}</TableCell>
        <TableCell>인증 사진</TableCell>
        <TableCell>날짜</TableCell>
      </TableWrapper>
      {[...Array(count)].map((_, index) => (
        <GreyWrapper>
          <NameTableCell>Name{/* 여기에 이름 들어감 */}</NameTableCell>

          <ImgContainer>
            <label htmlFor="upload-image">
              <ImgInput
                accept="image/*"
                id="upload-image"
                multiple
                type="file"
                onChange={onUpload}
              />
              {uploadText}
            </label>
            {imageSrc && <Image src={imageSrc} />}
          </ImgContainer>

          <TodayDate>{getDate()}</TodayDate>
        </GreyWrapper>
      ))}
      <AddBtn onClick={handleAddBox}>+</AddBtn>
    </MainWrapper>
  );
}

export default Certification;
