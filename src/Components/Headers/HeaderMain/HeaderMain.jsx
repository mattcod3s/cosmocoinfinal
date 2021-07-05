import React, {useContext,} from 'react';
import {useHistory} from 'react-router-dom';
import { CurrentUserContext } from '../../../context/context';
import './headerMainStyles.scss';
import userIcon from '../../../Assets/userIcon.svg';
import {useDispatch} from 'react-redux';

const HeaderMain = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    const logoutHandler = () => {
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setCurrentUser(null);
    }

    return (
        <div className="dashboard__header">
            <div className="logo__area">
                <div className="logo"></div>
            </div>
            <div className="profile__area">
                <div className="profile__details">
                    <div className="profile__img">
                        <img src={userIcon}/>
                    </div>
                    <div className="profile__name">
                    <h3>{JSON.parse(localStorage.getItem('profile'))?.name || JSON.parse(localStorage.getItem('profile'))?.firstName}</h3>
                        <h3>{/*JSON.parse(localStorage.getItem('profile')).result.name === undefined ? JSON.parse(localStorage.getItem('profile')).result.firstName : JSON.parse(localStorage.getItem('profile')).result.name*/ }</h3>

                    </div>
                </div>
                <div className="logout__buttonArea">
                    <div className="logout__btn" onClick={()=>logoutHandler()}>
                        <h4>Log Out</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain;
