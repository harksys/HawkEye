import HawkEye from './HawkEye';

// ES6 Promise Polyfill
import * as FakePromise from 'es6-promise';
(FakePromise as any).polyfill();

window.onload = () =>
{
  new HawkEye();
}