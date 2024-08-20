let header = document.querySelector('header');
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector('#menuBtn');
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

const url = 'https://romianipastry.de/call.php';
const data = {req_m: 'get_lp',page: 3};

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
