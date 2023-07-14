import React, { useState } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [serachState, setSerachState] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);

  const navigator = useNavigate();
  const { pathname } = useLocation();

  const showSearch = pathname !== '/my-page' && pathname !== '/board/write' && pathname.indexOf('/board/update') === -1;
  const isAuth = pathname === '/authentication';
  const isMyPage = pathname === '/my-page';
  const showUpload = pathname === '/board/write' || pathname.indexOf('/board/update') !== -1;

  const onLogoClickHandler = () => {
    navigator('/');
  }
  
  const onSignInButtonClickHandler = () => {
    setLogin(true);
    navigator('/authentication');
  }

  const onMyPageButtonClickHandler = () => {
    navigator('/my-page');
  }

  const onSignOutButtonClickHandler = () => {
    setLogin(false);
    navigator('/');
  }

  return (
    <div id='header'>
      <div className="header-left" onClick={onLogoClickHandler}>
        <div className="header-left-logo-icon"></div>
        <div className="header-left-logo-text">Seowoo's Board</div>
      </div>
      <div className="header-right">
        { (showSearch) && (serachState ? (
              <div className="header-search-box">
                <input className='header-search-input' type="text" />
                <div className="header-icon-box" onClick={() => setSerachState(false)}>
                  <div className="header-search-icon"></div>
                </div>
              </div>
            ) : (
              <div className="header-icon-box" onClick={() => setSerachState(true)}>
                <div className="header-search-icon"></div>
              </div>
            ) )
        }
        {
          !isAuth && (
            isMyPage ? (<div className="header-white-button" onClick={onSignOutButtonClickHandler}>로그아웃</div>) :
            showUpload ? (<div className="header-black-disable-button">업로드</div>) :
            login ? (<div className="header-white-button" onClick={onMyPageButtonClickHandler}>마이페이지</div>) : 
                    (<div className="header-black-button" onClick={onSignInButtonClickHandler}>로그인</div>)
          )
        }
      </div>
    </div>
  );
}
