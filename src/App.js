import Group from "./Components/Group/group";
import GroupJoin from "./Components/GroupJoin/groupJoin";
import GroupCreate from "./Components/GroupCreate/groupCreate";
import Traffic from "./Components/Traffic/traffic";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/reset.css";
import NotFound from "./Components/NotFound/notFound";
import MyPage from "Components/MyPage/MyPage";
import GroupRanking from "Components/GroupRanking/GroupRanking";
import Main from "Components/Main/Main";
import TrafficSolution from "Components/Traffic/TrafficSolution";
import Login from "Components/Login/Login";
import Register from "Components/Register/register";
import Header from "Components/Header/Header";
import Certification from "./Components/MyCertification/CertificationPage";
import Home from "Components/Home/Home";
import Member from "Components/GroupMember/Member";
import Food from "Components/Food/Food";
import FoodSolution from "Components/Food/FoodSolution";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/group" element={<Group />} />
          <Route path="/groupjoin" element={<GroupJoin />} />
          <Route path="/groupcreate" element={<GroupCreate />} />
          <Route path="/groupmember" element={<Member />} />
          <Route path="/rank" element={<GroupRanking />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/trafficsol" element={<TrafficSolution />} />
          <Route path="/mycertification" element={<Certification />} />
          <Route path="/food" element={<Food />} />
          <Route path="/foodSolution" element={<FoodSolution />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
