import React from 'react';

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'className'> {
    children: React.ReactNode;
}

const AuthenticationWrapper = ({ children, ...props }: Props) => (
    <div {...props} className="d-flex align-items-center justify-content-end">{children}</div>
);

export default AuthenticationWrapper;
