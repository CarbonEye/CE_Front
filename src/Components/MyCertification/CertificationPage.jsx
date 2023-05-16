import { useState } from "react";

import React from "react";

import { months } from "utils/months";
import styled from "styled-components";
import "./CertificationPage.scss";
import axios from "axios"; //

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

const TodayDate = styled.div`
  padding-left: 6vh;
  padding-right: 3vh;
  font-size: 1.2vh;
`;

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
  margin-right: 16vw;
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
  width: 3.5vh;
`;

function Certification() {
  const [inputs, setInputs] = useState({
    DateInput: "",
  });

  const [boxes, setBoxes] = useState([]); // new state variable to store the array of uploaded images

  const [count, setCount] = useState(1);

  const handleAddBox = async () => {
    const endpoint = "/user_auth";
    const method = "POST";
    const headers = {
      access_token: "your_access_token",
      refresh_token: "your_refresh_token",
    };
    const body = {
      user_name: "your_user_name",
      img: "your_image_url",
    };

    try {
      const response = await axios({
        method,
        url: endpoint,
        headers,
        data: body,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setBoxes([...boxes, ""]);
    setCount(count + 1);
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [uploadText, setUploadText] = useState("select your photo");

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        const imageSrc = reader.result || null; // get the image source
        setUploadText(""); //사진 업로드 하면 글자 없어짐
        setBoxes([...boxes.slice(0, boxes.length - 1), imageSrc]); // add the uploaded image to the array of uploaded images
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

      {boxes.map((imageSrc, index) => (
        <GreyWrapper key={index}>
          <NameTableCell>Name{/* 여기에 이름 들어감 */}</NameTableCell>
          <ImgContainer>
            {imageSrc ? (
              <Image src={imageSrc} alt="uploaded" />
            ) : (
              <label htmlFor={`img-upload-${index}`}>
                {uploadText || "사진 선택"}
              </label>
            )}
            <ImgInput
              id={`img-upload-${index}`}
              type="file"
              accept="image/*"
              onChange={onUpload}
            />
          </ImgContainer>
          <DateTableCell>
            <TodayDate>{getDate()}</TodayDate>
          </DateTableCell>
        </GreyWrapper>
      ))}
      <AddBtn onClick={handleAddBox}>+</AddBtn>
    </MainWrapper>
  );
}

export default Certification;
