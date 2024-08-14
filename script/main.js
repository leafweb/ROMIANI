let header = document.querySelector('header');
let fab = document.querySelector('button.fab');
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
let Fab = () => {
   if (event.currentTarget.classList.contains('hide')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   } else {
      window.open('menu.html', '_self');
   }
}
let Menu = () => {
   ToggleClass(menu, 'show');
   ToggleClass(menuBtn, 'show');
}
window.addEventListener('scroll', () => {
   let scrolled = window.scrollY;
   if (scrolled >= 250) {
      RemoveClass(header, 'hide');
      AddClass(fab, 'hide');
   } else {
      AddClass(header, 'hide');
      RemoveClass(fab, 'hide');
   }
});


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
   threshold: 0.1
};

const observer = new IntersectionObserver(callback, options);

elements.forEach(element => {
   observer.observe(element);
});