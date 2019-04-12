import React from 'react';
import {Route} from 'react-router-dom';
import {getRoute} from '../../utils/urls';


const pageView = [
    {
        key: getRoute('/qipa/'),
        path: getRoute('/qipa/'),
        component: "",
    }
]

const routeAll = pageView.map(page => <Route {...page}></Route>)


export default routeAll;