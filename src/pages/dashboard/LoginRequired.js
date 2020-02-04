import {Redirect} from 'react-router-dom';

import React from 'react';

export default function LoginRequired({children}) {

    if (localStorage.getItem("access")) {
        return children
    } else {
        return <Redirect to="/login"/>;
    }


}


