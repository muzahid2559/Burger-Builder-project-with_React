import {createStore} from 'redux';
import {reducer} from './reducer';

export const Mystore = createStore(reducer)