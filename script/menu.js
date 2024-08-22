let header = document.querySelector('header');
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector('#menuBtn');
let cardsContainer = document.querySelector('#cardsContainer');
let backBtn = document.querySelector('#backBtn');
let nextBtn = document.querySelector('#nextBtn');
let pageNum = 1;
let url = 'https://romianipastry.de/call.php';
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
let Next = () => {
   pageNum = pageNum + 1;
   FetchData(pageNum);
}
let Back = () => {
   pageNum = pageNum - 1;
   FetchData(pageNum);
}
let FetchData = (x) => {
   fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({req_m:'get_lp',page: x})
      })
      .then(response => response.json())
      .then(data => {
         Cards(data);
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   // btns
   backBtn.disabled = (pageNum == 1);
   nextBtn.disabled = true;
   fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({req_m:'get_lp',page: (x + 1)})
      })
      .then(response => response.json())
      .then(data => {
         nextBtn.disabled = false;
         if (data.length == 0) {
            nextBtn.disabled = true;
         }
      })
      .catch((error) => {
         nextBtn.disabled = true;
      });
}
FetchData(pageNum);
nextBtn.onclick = () => Next();
backBtn.onclick = () => Back();

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