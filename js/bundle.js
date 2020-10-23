/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function calc() {
  //Calc
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
  }else{
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
  }else{
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem=>{
      elem.classList.remove(activeClass);
      if(elem.getAttribute('id') === localStorage.getItem('sex')){
        elem.classList.add(activeClass);
      }
      if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
        elem.classList.add(activeClass);
      }
    }); //end forEach
  } //end function initLocalSettings
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
      result.textContent = '____';
      return;
    }

    if(sex === 'female'){
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }else{
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcTotal();

  function getStaticInformation(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem=>{
      elem.addEventListener('click', (e)=>{
        if(e.target.getAttribute('data-ratio')){
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        }else{
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem=>{
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      }); //end addEventListener click
    }); //end forEach
  } //end function getStaticInformation
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector){
    const input = document.querySelector(selector);
    input.addEventListener('input', ()=>{
      if(input.value.match(/\D/g)){
        input.style.border = '1px solid red';
      } else{
        input.style.border = 'none';
      }
      switch(input.getAttribute('id')){
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      } // end switch
      calcTotal();
    }); //end addEventListener input
  } //end function getDynamicInformation
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
} //end calc

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function cards() {
  //Используем классы для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if(this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    } //end render
  } //end class MenuCard

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getResource('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); //end then
} //end function cards

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function forms() {
  // Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  });


  function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);


        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        const postData = async (url, data) => {
          const res = await fetch(url, {
            method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: data
          });
          
          if (res.ok) {
            showThanksModal(message.success);
            return await res.json();
          } else {
            showThanksModal(message.failure);
          }
        }; //end function postData

        postData('http://localhost:3000/requests', json)
        .then((data) => {
            console.log(data);
            statusMessage.remove(); //удаляем спиннэр
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
      }); //end finally
    }); //end addEventListener submit
  } //end bindPostData

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove(); //10:50
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000); //end setTimeout
  } //end function showThanksModal
} //end function forms

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal() {
  //Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  } //end openModal

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  }); //end forEach

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  } //end closeMadal

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  }); //end addEventListener click

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }); //end addEventListener keydown

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  } //end function showModalByScroll

  window.addEventListener('scroll', showModalByScroll);
} //end modal

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function slider() {
  //Slider
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(sliderWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  total.textContent = slides.length;

  //My first technical function
  function getSlideIndex(){
    if(slideIndex < 10){ //error
      current.textContent = `0${slideIndex}`;
    }else{
      current.textContent = slideIndex;
    }
  }

  //My second technical function
  function getOpacityShow(dots){
    dots.forEach(dot=>dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  //Call the first technical function
  getSlideIndex();

  sliderInner.style.width = 100 * slides.length + '%';
  sliderInner.style.display = 'flex';
  sliderInner.style.transition = '0.5s all';

  sliderWrapper.style.overflow = 'hidden';

  slides.forEach(slide=>{
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
              dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
slider.append(indicators);

for(let i = 0; i < slides.length; i++){
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1);
  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  `;

  if(i == 0){
    dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
}

  //My third technical function
  function deleteNotDigits(string){
    return +string.replace(/\D/g, '');
  }

  next.addEventListener('click', ()=>{
    if(offset == deleteNotDigits(width) * (slides.length - 1)){
      offset = 0;
    }else{
      offset += deleteNotDigits(width);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;



    if(slideIndex == slides.length){
      slideIndex = 1;
    }else{
      slideIndex++;
    }

    //Call the first technical function
    getSlideIndex();

    //Call the second technical function
    getOpacityShow(dots);
  });


  prev.addEventListener('click', ()=>{
    if(offset == 0){
      offset = deleteNotDigits(width) * (slides.length - 1);
    }else{
      offset -= deleteNotDigits(width);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;


    if(slideIndex == 1){
      slideIndex = slides.length;
    }else{
      slideIndex--;
    }

    //Call the first technical function
    getSlideIndex();

    //Call the second technical function
    getOpacityShow(dots);
  }); // end prev.addEventListener click

  dots.forEach(dot=>{
    dot.addEventListener('click', (e)=>{
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      sliderInner.style.transform = `translateX(-${offset}px)`;

    //Call the first technical function
    getSlideIndex();

    //Call the second technical function
    getOpacityShow(dots);
    }); //end addEventListener click
  }); // end forEach
} //end slider

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tabs() {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
  tabsContent = document.querySelectorAll('.tabcontent'),
  tabParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); //end forEach 1

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    }); //end forEach 2
  } //end function hideTabContent

  function showTabContent(i = 0) {
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');

  tabs[i].classList.add('tabheader__item_active');
  } //end function showTabContent

  hideTabContent();
  showTabContent();

  tabParent.addEventListener('click', (event) => {
  const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((element, index) => {
        if (target == element) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  }); //end addEventListener click
} //end function tabs

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 58:0-14 */
/***/ ((module) => {

function timer() {
  //Timer
  const deadline = '2020-11-08';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t/(1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
      'total':t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  } //end function getTimeRemaining

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num < 0) {
      return '00';
    }else {
      return num;
    }
  } //end function getZero

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    } //end function updateClock
  } //end function setClock

  setClock('.timer', deadline);
} //end function timer

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
  tabs();
  modal();
  timer();
  cards();
  forms();
  slider();
  calc();
}); // end addEventListener DOMContentLoaded
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map