import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main/Main'
import Header from './components/Section/Header'
import Suggest from './components/Suggest/Suggest'
import Report from './components/Report/Report'
import Record from './components/Record/Record'
import Settle from './components/Settle/Settle'
import Mypage from './components/Mypage/Mypage'
import Login from './components/Login/Login'
import { Join } from './components/Join/Join'
import Nav from './components/Section/Nav'
import Team from './components/Team/Team'
import TeamJoin from './components/Team/TeamJoin'
import Travel from './components/Travel/Travel'
import TravelDetail from './components/Travel/TravelDetail'
import Signup from './components/Login/Signup';
import SignupSuccess from './components/Login/Signup_success';
import Splash from './components/Login/Splash';
import MypageProfile from './components/Mypage/Profile'

import MainLogout from './components/Main/MainLogout'
import MainLogin from './components/Main/MainLogin'
import AiSuggest from './components/Suggest/AiSuggest'
import AiResult from './components/Suggest/AiResult'
import AiResultPart from './components/Suggest/AiResultPart'
import SuggestDetail from './components/Suggest/SuggestDetail';
import RecordEdit from './components/Record/RecordEdit'
import RecordCreate from './components/Record/RecordCreate'
import TotalReport from './components/Report/TotalReport'
import TotalSettle from './components/Settle/TotalSettle'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/team' element={<Team />} />
                <Route path='/teamjoin' element={<TeamJoin />} />
                <Route path='/travel/:now' element={<Travel />} />
                <Route path='/traveldetail' element={<TravelDetail />} />
                <Route path='/suggest' element={<Suggest />} />
                <Route path='/report' element={<Report />} />

                <Route path='/record' element={<Record />} />
                <Route path='/record_create' element={<RecordCreate />} />
                <Route path='/record_edit' element={<RecordEdit />} />
                <Route path='/total_report' element={<TotalReport />} />


                <Route path='/settle' element={<Settle />} />
                <Route path='/total_settle' element={<TotalSettle />} />

                <Route path='/mypage' element={<Mypage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/mypage/*' element={<MypageRoutes />} /> {/* Mypage 관련 라우트 */}
                <Route path='/login/*' element={<LoginRoutes />} /> {/* Login 관련 라우트 */}
                <Route path='/join' element={<Join />} />

                <Route path='/mainlogout' element={<MainLogout />} />
                <Route path='/mainlogin' element={<MainLogin />} />
                <Route path="/suggest/:id" element={<SuggestDetail />} />
                <Route path='/aiSuggest' element={<AiSuggest />} />
                <Route path='/aiResult' element={<AiResult />} />
                <Route path='/aiResultPart' element={<AiResultPart />} />
            </Routes>
            <Nav />
        </BrowserRouter>
    );
};

// Mypage 관련 라우트 컴포넌트
const MypageRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Mypage />} />
            <Route path='profile' element={<MypageProfile />} />
        </Routes>
    );
};

// Login 관련 라우트 컴포넌트
const LoginRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signupSuccess' element={<SignupSuccess />} />
            <Route path='splash' element={<Splash />} />
        </Routes>
    );
};

export default App;
