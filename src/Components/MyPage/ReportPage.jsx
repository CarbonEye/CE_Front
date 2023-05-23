// 두 번째 페이지
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { averageConsume } from "API/account";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SolutionBox = styled.div`
  width: 40vh;
  height: 70vh;
  border: 0.3lvh solid #edeff7;
  border-radius: 3vh;
  margin: 5vh auto;
`;

const CarbonBox = styled.div`
  height: 11vh;
  width: 75vw;
  margin-top: 4vh;
  line-height: 11vh;
  font-size: 3vh;
  font-weight: 500;
  display: flex;
  flex-direction: column;
`;

const AvgMent = styled.span`
  margin-left: 8vw;
  font-size: 2vh;
  font-weight: bold;
  margin-bottom: 3vh;
  height: 2vh;
`;

const AvgCarbonUsage = styled.span`
  font-size: 3.5vh;
  color: #009688;
  margin-left: 8vw;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  margin-top: 5vh;
  width: 80vw;
  height: 1vh;
  margin-bottom: 27vh;
`;

const AvgLine = styled.span`
  border: none;
  border-bottom: 0.3lvh solid #edeff7;
  height: 5vh;
  width: 80vw;
  display: block;
  margin: 0 auto;
  padding: 0.1lvh 0.1lvh 0.1lvh 0.5lvh;
`;

const data = [
  { name: "5일 전", carbon: 2400 },
  { name: "4일 전", carbon: 1398 },
  { name: "3일 전", carbon: 9800 },
  { name: "2일 전", carbon: 3908 },
  { name: "1일 전", carbon: 4800 },
];

function ReportPage() {
  const [solution, setSolution] = useState();
  const [avg, setAvg] = useState();

  useEffect(() => {
    averageConsume().then((res) => {
      data[0].carbon = res.five_day_ago;
      data[1].carbon = res.four_day_ago;
      data[2].carbon = res.three_day_ago;
      data[3].carbon = res.two_day_ago;
      data[4].carbon = res.one_day_ago;
      setAvg(res.avg);
    });
  }, []);

  return (
    <Wrapper>
      <SolutionBox>
        <ChartContainer>
          <BarChart
            width={336}
            height={240}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickMargin="8" />
            <YAxis hide={true} />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbon" fill="#92B8B1" />
          </BarChart>
        </ChartContainer>
        <AvgLine />
        <CarbonBox>
          <AvgMent>{"평균 소비량"}</AvgMent>
          <AvgCarbonUsage>{avg ? avg : "no Data"}/kwh</AvgCarbonUsage>
        </CarbonBox>
      </SolutionBox>
    </Wrapper>
  );
}

export default ReportPage;
