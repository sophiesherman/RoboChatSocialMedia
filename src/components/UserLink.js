import React from 'react';

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

const UserLink = ({ user }) => {
    return (
        <div className="link">
                <Link to={`/users/${user}`}>@{user}</Link>
        </div>
    )
}

export default UserLink;