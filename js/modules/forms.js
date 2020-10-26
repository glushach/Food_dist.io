import {openModal, closeModal} from './modal';
import {postData} from '../services/services';
import {message} from '../services/services';

function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);

  //object message was here

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

//function postData was here

        postData('http://localhost:3000/requests', json, showThanksModal)
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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000); //end setTimeout
  } //end function showThanksModal
} //end function forms

export default forms;