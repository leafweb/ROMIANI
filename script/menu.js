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
let List = (data) => {
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
      <div class="profile">
         <img src="${fetchResults[x].profile}">
      </div>
      <div class="text">
         <div>
            <span class="title"> ${fetchResults[x].pname} </span>
            <span> ${fetchResults[x].pdescribe} </span>
            <div class="d">
               <span> ${fetchResults[x].price}$ </span>
               <span class="type"> ${fetchResults[x].type} </span>
            </div>
         </div>
         <button onclick="dialog.close()"> close </button>
      </div>
   `
}
window.addEventListener('scroll', () => {
   let scrolled = window.scrollY;
   if (scrolled >= 300) {
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
let indexArray = 0;
let nx = 100;
let fetchResults;
let FetchData = ()=> {
   fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({req_m: 'get_lp', page: 1})
      })
      .then(response => response.json())
      .then(data => {
         fetchResults = data;
         ShowItems();
      })
      .catch((error) => {
         console.error(error);
      });
}
let ShowItems = ()=> {
   let newArr = fetchResults.slice(indexArray * nx, (indexArray * nx) + nx);
   List(newArr);
}
let LoadMore = ()=> {
   
}
FetchData();