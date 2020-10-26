function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs
  const tabs = document.querySelectorAll(tabsSelector),
  tabsContent = document.querySelectorAll(tabsContentSelector),
  tabParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); //end forEach 1

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    }); //end forEach 2
  } //end function hideTabContent

  function showTabContent(i = 0) {
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');

  tabs[i].classList.add(activeClass);
  } //end function showTabContent

  hideTabContent();
  showTabContent();

  tabParent.addEventListener('click', (event) => {
  const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((element, index) => {
        if (target == element) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  }); //end addEventListener click
} //end function tabs

export default tabs;