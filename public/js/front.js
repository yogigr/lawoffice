// mobile menu
const openMobileMenuBtn = document.querySelector(".open-mobile-menu-button");
const closeMobileMenuBtn = document.querySelector(".close-mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

openMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
closeMobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//practice area
const hiddenPractice = document.querySelectorAll('.hidden-practice');
const togglePracticeBtn = document.querySelector('#toggle-practice-btn');
togglePracticeBtn.innerHTML = 'SHOW ALL';
togglePracticeBtn.addEventListener("click", (e) => {
  hiddenPractice.forEach(el => {
    el.classList.toggle("hidden");
  });
  if (e.target.innerHTML === 'SHOW ALL') {
    e.target.innerHTML = 'HIDE'
  } else {
    e.target.innerHTML = 'SHOW ALL'
    location.href = '#practices';
  }
});

//people
const hiddenPeople = document.querySelectorAll('.hidden-people');
const togglePeopleBtn = document.querySelector('#toggle-people-btn');
togglePeopleBtn.innerHTML = 'SHOW ALL';
togglePeopleBtn.addEventListener("click", (e) => {
  hiddenPeople.forEach(el => {
    el.classList.toggle("hidden");
  });
  if (e.target.innerHTML === 'SHOW ALL') {
    e.target.innerHTML = 'HIDE'
  } else {
    e.target.innerHTML = 'SHOW ALL'
    location.href = '#peoples';
  }
});

// to top btn
const toTopBtn = document.getElementById('toTopBtn');
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
}