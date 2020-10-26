function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
  //Slider
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          sliderWrapper = document.querySelector(wrapper),
          sliderInner = document.querySelector(inner),
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

export default slider;