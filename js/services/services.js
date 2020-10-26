const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};

const postData = async (url, data, showThanksModal) => {
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

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};


export {message};
export {postData};
export {getResource};
