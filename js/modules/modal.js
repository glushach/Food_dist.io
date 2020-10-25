function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  console.log(modalTimerId);
  if(modalTimerId) {
    clearInterval(modalTimerId);
  }
} //end openModal

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
} //end closeMadal


function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  }); //end forEach

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  }); //end addEventListener click

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  }); //end addEventListener keydown

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  } //end function showModalByScroll

  window.addEventListener('scroll', showModalByScroll);
} //end modal

export default modal;
export {openModal};
export {closeModal};