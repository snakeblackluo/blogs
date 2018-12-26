import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from '../utils/history';

const CreateRootReducer = combineReducers ({
    router: connectRouter(History),
   
});

export default CreateRootReducer;