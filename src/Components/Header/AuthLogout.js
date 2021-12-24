import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

export const AuthLogout = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token');
    }

    return (
        <li className="nav-item mb-2 mb-lg-0">
            <NavLink onClick={handleLogout} className="nav-link me-3 mx-lg-5" to="/" exact >
                Logout
            </NavLink>
        </li>
    )
}
