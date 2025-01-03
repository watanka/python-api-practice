import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-menu">
                {user ? (
                    <>
                        <span className="welcome-text">
                            {user.username}님 환영합니다
                        </span>
                        <button onClick={logout} className="nav-button">
                            로그아웃
                        </button>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="nav-button">로그인</Link>
                        <Link to="/signup" className="nav-button">회원가입</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;