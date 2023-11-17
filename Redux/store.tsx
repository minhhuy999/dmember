import { combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './Reducer';
import epics from './epics';

const rootEpic = combineEpics(epics);
const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
    app: Reducer,
});

const store = configureStore({reducer : rootReducer, middleware : [epicMiddleware]});

epicMiddleware.run(rootEpic);

export default store;
