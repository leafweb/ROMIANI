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

let url = 'https://romianipastry.de/call.php';
let data = [];


for (var i = 0; i < 10; i++) {
   fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ req_m: 'get_lp', page: i })
   }).then(response => response.json()).then(x => {
      console.log('Success:', x);
      data.push(x);
   }).catch((error) => {
      console.error('Error:', error);
   });

}