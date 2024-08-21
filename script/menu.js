let header = document.querySelector('header');
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector('#menuBtn');
let cardsContainer = document.querySelector('#cardsContainer');
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
let Cards = (x)=> {
   cardsContainer.innerHTML = `
      <div class="card">
         <img src="${x.profile}">
         <h4> ${pname} </h4>
         <p> ${pdescribe} </p>
         <div>
            <span> ${x.price}$ </span>
            <span class="type"> cookie </span>
         </div>
      </div>
   `;
}
let Menu = () => {
   ToggleClass(menu, 'show');
   ToggleClass(menuBtn, 'show');
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

let url = 'https://romianipastry.de/call.php';
let input = { req_m: 'get_lp', page: 1 };

fetch(url, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(input)
})
.then(response => response.json())
.then(data => {
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
}).catch((error) => {
   console.error('Error:', error);
});