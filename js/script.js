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

  tabs();
  modal('[data-modal]', '.modal', modalTimerId);
  timer();
  cards();
  forms('forms', modalTimerId);
  slider();
  calc();
}); //end addEventListener DOMContentLoaded