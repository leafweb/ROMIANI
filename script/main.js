let header = document.querySelector('header');
let fab = document.querySelector('button.fab');
let main = document.querySelector('main');
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
let Fab = ()=> {
   if (event.currentTarget.classList.contains('hide')) {
      main.scrollTo({top: 0,behavior: 'smooth'});
   } else {
      window.open('menu.html','_self');
   }
}
let Menu = ()=> {
   ToggleClass(menu,'show');
   ToggleClass(menuBtn,'show');
}
main.addEventListener('scroll', ()=> {
  let scrolled = main.scrollTop;
  if (scrolled >= 250) {
    RemoveClass(header,'hide');
    AddClass(fab,'hide');
  } else {
     AddClass(header,'hide');
     RemoveClass(fab,'hide');
  }
});