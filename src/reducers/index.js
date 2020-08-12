import { combineReducers } from 'redux';
import CoinReducers from './CoinReducers';

const reducers = combineReducers({
    coin: CoinReducers,
});

export default reducers;