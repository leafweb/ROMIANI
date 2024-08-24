let header = document.querySelector('header');
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector('#menuBtn');
let cardsContainer = document.querySelector('#cardsContainer');
let backBtn = document.querySelector('#backBtn');
let nextBtn = document.querySelector('#nextBtn');
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
let Cards = (data) => {
   cardsContainer.innerHTML = '';
   for (x of data) {
      cardsContainer.innerHTML += `
      <div class="card">
         <img src="${x.profile}">
         <h4> ${x.pname} </h4>
         <p> ${x.pdescribe} </p>
         <div>
            <span> ${x.price}$ </span>
            <span class="type"> cookie </span>
         </div>
      </div>
   `;
   }
}

window.addEventListener('load', function() {
   let elements = document.querySelectorAll('.scrollAnim');
   let callback = (entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('showAnim');
         } else {
            entry.target.classList.remove('showAnim');
         }
      });
   };
   const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
   };
   const observer = new IntersectionObserver(callback, options);
   elements.forEach(element => {
      observer.observe(element);
   });
});

let url = 'data.json';
let indexArray = 0;
let pageNum = 1;
let nx = 3;
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
   Cards(newArr);
   nextBtn.disabled = fetchResults.length - indexArray * nx <= nx;
   backBtn.disabled = indexArray == 0;
}
let NextArr = ()=> {
   indexArray = indexArray + 1;
   ShowItems();
}
let BackArr = ()=> {
   indexArray = indexArray - 1;
   ShowItems();
}
nextBtn.onclick = () => NextArr();
backBtn.onclick = () => BackArr();
FetchData();