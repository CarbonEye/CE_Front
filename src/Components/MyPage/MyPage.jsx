// 첫 번째 페이지
import { useState } from "react";
import styled from "styled-components";
//연동
import axios from "axios";
//axios를 사용해서 PUT요청을 서버로 보냄

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  margin-bottom: 2vh;
`;

const InfoText = styled.div`
  color: black;
  font-size: 2vh;
  margin-left: 6vh;
  font-weight: bold;
`;

const GreyBox = styled.input`
  width: 80vw;
  padding: 0.1lvh 0.1lvh 0.1lvh 0.5lvh;
  margin: 10vh auto 0 auto;
  margin-top: 2vh;
  line-height: 5vh;
  border-radius: 1vw;
  border: none;
  background-color: #e5e5e5;
  display: flex;
  opacity: 0.5;
`;

const ModifyBox = styled.div`
  height: 5vh;
  width: 80vw;
  color: white;
  font-weight: bold;
  font-size: 2vh;
  line-height: 5vh;
  background-color: #92b8b1;
  border-radius: 1vh;
  text-align: center;
  margin: 40vh auto 0 auto;
`;

function MyPage() {
  const [username, setUsername] = useState("고양이");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("cat1234@naver.com");

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        "/account", //이 엔드포인트를 통해 사용자 정보를 수정한다.
        {
          name: username,
          email: email,
          old_password: "",
          new_password: "",
        },
        {
          headers: {
            access_token: "my access_token",
            refresh_token: "my refresh_token",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InfoWrapper>
          <InfoWrapper>
            <InfoText>이름</InfoText>
            <GreyBox
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </InfoWrapper>
          <InfoWrapper>
            <InfoText>이메일</InfoText>
            <GreyBox
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </InfoWrapper>
        </InfoWrapper>
        <ModifyBox type="submit">수정</ModifyBox>
      </form>
    </div>
  );
}

export default MyPage;
