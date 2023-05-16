import { useState } from "react";
import React from "react";
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
  const [boxes, setBoxes] = useState([]);
  const [count, setCount] = useState(1);
  const [uploadText, setUploadText] = useState("select your photo");
  const API_ENDPOINT =
    "https://vscode-jyyiu.run.goorm.site/proxy/8000/user_auth";

  const submitData = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          access_token: "access token",
          refresh_token: "refresh token",
        },
        body: JSON.stringify({
          user_name: inputs.user_name,
          img: inputs.img,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        const file = input.files[0];
        resolve(file);
      };
      input.click();
    });
  };

  const handleAddBox = async () => {
    const file = await selectImage();
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageSrc = reader.result || null;
      setBoxes([...boxes, imageSrc]);
      setInputs({
        ...inputs,
        img: imageSrc,
      });
    };
  };

  const onChange = ({ target }) => {
    const { name, value } = target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        const imageSrc = reader.result || null;
        setUploadText("");
        setBoxes([...boxes.slice(0, boxes.length - 1), imageSrc]);
        setInputs({
          ...inputs,
          img: imageSrc,
        });
        resolve();
      };
    });
  };

  const getDate = () => {
    let now = new Date();
    let todayDate = now.getDate();
    const curMonth = months[now.getMonth()].name;

    return curMonth + ", " + todayDate;
  };

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
//
export default Certification;
