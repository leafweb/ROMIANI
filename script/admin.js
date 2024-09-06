let searchBox = document.querySelector('#searchBox');
let filtersFormElm = document.querySelector('#filters form');
let listElm = document.querySelector('#list');
let pageNumElm = document.querySelector('#page-num');
let nextBtn = document.querySelector('#next');
let backBtn = document.querySelector('#back');


let ShowItems = (data) => {
   listElm.innerHTML = '';
   for (x in data) {
      listElm.innerHTML += `
      <div class="item">
         <div class="card" onclick="PreviewDialog(${x})">
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
         <div class="tools">
            <button class="edit" onclick="EditDialog(${x})">
               <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z"/><path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z"/></svg>
            </button>
            <button class="remove" onclick="RemoveDialog(${x})">
               <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"/></svg>
            </button>
         </div>
      </div>
   `;
   }
}
let PreviewDialog = (x) => {
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

let url = 'data.json';
let currentPage = 0;
let currentSearch = '';
let pageSize = 20;
let items = [];
let filteredItems = [];
let searchedItems = [];
let finalResults = [];
let allTypes = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
    items = data;
    Filter();
    Search();
    allTypes = [...new Set(items.map(item => item.type))];
    filtersFormElm.innerHTML = '';
    for (i of allTypes) {
       filtersFormElm.innerHTML += `<input class="chip" type="checkbox" name="type" value="${i}"> `;
    }
  })
  .catch(error => console.error('Error fetching data:', error));
  
function getCurrentPageItems() {
  let start = currentPage * pageSize;
  let end = start + pageSize;
  finalResults = searchedItems.slice(start, end);
  pageNumElm.innerHTML = (currentPage + 1) + ' / ' + (Number((searchedItems.length / pageSize).toFixed(0)) + 1); 
  return finalResults
}
function Next() {
  if ((currentPage + 1) * pageSize < searchedItems.length) {
    currentPage++;
    ShowItems(getCurrentPageItems()); // نمایش آیتم‌های صفحه بعد
  }
  window.scrollTo({ top: 330, behavior: 'smooth' });
  updateButtons();
}
function Back() {
  if (currentPage > 0) {
    currentPage--;
    ShowItems(getCurrentPageItems()); // نمایش آیتم‌های صفحه قبل
  }
  window.scrollTo({ top: 330, behavior: 'smooth' });
  updateButtons();
}
function updateButtons() {
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
   Filter(formData.getAll('type'));
   Search(currentSearch)
}
function Search(query) {
   if (!query) {
      searchedItems = filteredItems;
      ShowItems(getCurrentPageItems());
      updateButtons();
      return;
   }
   currentSearch = query;
   let regex = new RegExp(query.split('').join('.*'), 'i');
   searchedItems = filteredItems.filter(filteredItems => regex.test(filteredItems.pname));
   currentPage = 0;
   ShowItems(getCurrentPageItems());
   updateButtons();
} 