import { REHYDRATE } from './lib'
import {
  persistStore as newPersistStore,
  autoRehydrate as newAutoRehydrate,
  getStoredState as newGetStoredState
} from './lib'
import {
  persistStore as oldPersistStore,
  autoRehydrate as oldAutoRehydrate,
  getStoredState as oldGetStoredState
} from 'redux-persist'

import { createStore, combineReducers } from 'redux'

const initialState = {}
for(let i = 0; i < 1000000; i++) {
  initialState['somekey' + i] = {}
}

const counter = function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

const reducer = combineReducers({
  counter,
  ...initialState
})
const store = createStore(reducer);
const oldStore = createStore(reducer);

const newPersistStoreFunc = newPersistStore(store)
const oldPersistStoreFunc = oldPersistStore(oldStore)
const storeAuto = createStore(reducer, undefined, newAutoRehydrate());
const oldStoreAuto = createStore(reducer, undefined, oldAutoRehydrate());

JSLitmus.test('new persist data', function(count) {
  window.localStorage.clear()
  while (count--) {
    store.dispatch({type: 'INCREMENT'})
  }
})

JSLitmus.test('old persist data', function(count) {
  window.localStorage.clear()
  while (count--) {
    oldStore.dispatch({type: 'INCREMENT'})
  }
})

JSLitmus.test('new autoRehydrate', function(count) {
  window.localStorage.setItem('reduxPersist:counter', '4447092')
  while (count--) {
    newGetStoredState({}, (err, data) => {
      storeAuto.dispatch( {
        type: REHYDRATE,
        payload: data
      })
    })
  }
})

JSLitmus.test('old autoRehydrate', function(count) {
  window.localStorage.setItem('reduxPersist:counter', '4447092')
  while (count--) {
    oldGetStoredState({}, (err, data) => {
      oldStoreAuto.dispatch( {
        type: REHYDRATE,
        payload: data
      })
    })
  }
})
