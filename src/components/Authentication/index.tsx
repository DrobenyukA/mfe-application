import React from 'react';
import { useSelector } from 'react-redux';

import useActions from '../../hooks/useAction';
import { setUser } from '../../store/session/actions';
import { getUser } from '../../store/session/selectors';
import AuthenticationWrapper from './Wrapper';

const Authentication = () => {
    const user = useSelector(getUser);
    const setUserAction = useActions(setUser);
    
    const handleLogin = React.useCallback(
        () => setUserAction({ name: 'John Doe', email: 'john.doe@test.com' }),
        [],
    );

    const handleLogout = React.useCallback(
        () => setUserAction(null),
        [],
    );
    
    if (user) {
        return (
            <AuthenticationWrapper>
                <p className="m-0 pe-3">Hello {user.name}</p>
                <button type="button" className="btn btn-outline-warning me-2" onClick={handleLogout}>
                    Logout
                </button>
            </AuthenticationWrapper>
        );
    }
    
    return (
        <AuthenticationWrapper>
            <button type="button" className="btn btn-warning me-2" onClick={handleLogin}>
                Login
            </button>
        </AuthenticationWrapper>
    );
}

export default Authentication;
