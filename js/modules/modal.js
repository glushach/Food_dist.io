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