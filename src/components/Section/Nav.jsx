import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../assets/img/Main/home.svg'
import Suggest from '../../assets/img/Main/search.svg'
import Report from '../../assets/img/Main/Report.svg'
import Mypage from '../../assets/img/Main/mypage.svg'

const Nav = () => {
    return (
        <div className='Nav_wrap'>
            <Link to='/'><img src={Home} alt="Home" /></Link>
            <Link to='/suggest'><img src={Suggest} alt="Suggest" /></Link>
            <Link to='/travel/now'><img src={Report} alt="Report" /></Link>
            <Link to='/mypage'><img src={Mypage} alt="Mypage" /></Link>
        </div>
    )
}

export default Nav