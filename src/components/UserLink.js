import React from 'react';

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

const UserLink = ({ user }) => {
    return (
        <b className="link">
                <Link to={`/users/${user}`}>@{user}</Link>
        </b>
    )
}

export default UserLink;