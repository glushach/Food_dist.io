import 'dom-node-polyfills';
import 'whatwg-fetch';
import 'formdata-polyfill';
import 'fetch-polyfill';


import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 500000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2020-11-08');
  cards();
  forms('form', modalTimerId); //wrote 'formS' instead of 'form'
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner'
  });
  calc();
}); //end addEventListener DOMContentLoaded