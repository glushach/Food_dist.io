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