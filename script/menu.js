let header = document.querySelector('header');
let searchBox = document.querySelector('#searchBox');
let filtersBox = document.querySelector('.filters');
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector('#menuBtn');
let fab = document.querySelector('button.fab');
let listElm = document.querySelector('#list');
let dialog = document.querySelector('dialog');
let AddClass = (x, y) => {
   if (!x.classList.contains(y)) {
      x.classList.add(y);
   }
}
let RemoveClass = (x, y) => {
   if (x.classList.contains(y)) {
      x.classList.remove(y);
   }
}
let ToggleClass = (x, y) => {
   x.classList.toggle(y);
}
let Menu = () => {
   ToggleClass(menu, 'show');
   ToggleClass(menuBtn, 'show');
}
let Fab = () => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
}
let ShowItems = (data) => {
   listElm.innerHTML = '';
   for (x in data) {
      listElm.innerHTML += `
      <div class="item" onclick="ShowInfo(${x})">
         <div class="profile">
            <img src="${data[x].profile}">
         </div>
         <div class="text">
            <span class="title"> ${data[x].pname} </span>
            <div>
               <span> ${data[x].price}$ </span>
               <span class="type"> ${data[x].type} </span>
            </div>
         </div>
      </div>
   `;
   }
}
let ShowInfo = (x) => {
   dialog.showModal();
   dialog.innerHTML = `
      <img src="${finalResults[x].profile}">
      <div class="text">
         <div>
            <span class="title"> ${finalResults[x].pname} </span>
            <span> ${finalResults[x].pdescribe} </span>
            <div class="d">
               <span> ${finalResults[x].price}$ </span>
               <span class="type"> ${finalResults[x].type} </span>
            </div>
         </div>
         <button onclick="dialog.close()"> close </button>
      </div>
   `
}
window.addEventListener('scroll', () => {
   let scrolled = window.scrollY;
   if (scrolled >= 250) {
      AddClass(header, 'small');
      AddClass(filtersBox, 'small');
      RemoveClass(fab, 'hide');
   } else {
      RemoveClass(header, 'small');
      RemoveClass(filtersBox, 'small');
      AddClass(fab, 'hide');
   }
});

let url = 'data.json';
let currentPage = 0;
let pageSize = 50;
let items = [];
let filteredItems = [];
let searchedItems = [];
let finalResults = []

fetch(url)
  .then(response => response.json())
  .then(data => {
    items = data;
    Filter();
    Search();
  })
  .catch(error => console.error('Error fetching data:', error));

function getCurrentPageItems() {
  let start = currentPage * pageSize;
  let end = start + pageSize;
  finalResults = searchedItems.slice(start, end);
  return finalResults
}

function Next() {
  if ((currentPage + 1) * pageSize < searchedItems.length) {
    currentPage++;
    ShowItems(getCurrentPageItems()); // نمایش آیتم‌های صفحه بعد
  }
  window.scrollTo({ top: 330, behavior: 'smooth' });
  updateButtons();
  history.pushState({ page: currentPage }, '');
}

function Back() {
  if (currentPage > 0) {
    currentPage--;
    ShowItems(getCurrentPageItems()); // نمایش آیتم‌های صفحه قبل
  }
  window.scrollTo({ top: 330, behavior: 'smooth' });
  updateButtons();
  history.pushState({ page: currentPage }, '');
}

function updateButtons() {
   let nextBtn = document.getElementById('nextBtn');
   let backBtn = document.getElementById('backBtn');

   if ((currentPage + 1) * pageSize >= searchedItems.length) {
      nextBtn.disabled = true;
   } else {
      nextBtn.disabled = false;
   }

   if (currentPage === 0) {
      backBtn.disabled = true;
   } else {
      backBtn.disabled = false;
   }
   
   ClearHistory();
}

function Filter(types) {
   if (!types || types.length === 0) {
      filteredItems = items;
      ShowItems(getCurrentPageItems());
      updateButtons();
      return;
   }
   filteredItems = items.filter(item => types.includes(item.type));
   currentPage = 0;
   ShowItems(getCurrentPageItems());
   updateButtons();
}

function formFilter(form){
   let formData = new FormData(form);
   Filter(formData.getAll('type'))
}

function Search(query) {
   if (!query) {
      searchedItems = filteredItems;
      ShowItems(getCurrentPageItems());
      updateButtons();
      return;
   }
   const regex = new RegExp(query.split('').join('.*'), 'i');
   searchedItems = filteredItems.filter(filteredItems => regex.test(filteredItems.pname));
   currentPage = 0;
   ShowItems(getCurrentPageItems());
   updateButtons();
} 

function ClearHistory() {
  history.replaceState(null, '', location.href);
  history.pushState(null, '', location.href);
  window.addEventListener('popstate', function() {
    history.pushState(null, '', location.href);
  });
}


window.onpopstate = function(event) {
   if (event.state && event.state.page !== undefined) {
      currentPage = event.state.page;
      ShowItems(getCurrentPageItems());
      updateButtons();
   }
};