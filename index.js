
let isCloseButtonClicked = false;
let intervalId;
var scaleFactor = 1;
let modalImage = document.querySelector("#thanks-modal img");

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");

  modal.style.display = "flex";

  const modalText = document.createElement("p");
  modalText.innerHTML = `Thank you so much ${person.name}!<br>${person.hometown} represent!`;
  modalText.classList.add('modal-text');
  modalContent.prepend(modalText);


  intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    if (!isCloseButtonClicked) {
      closeModal();
    }
  }, 4000);

  const closeModalBtn = document.getElementById("close-modal-btn");
  closeModalBtn.addEventListener("click", closeThanksModal);

};


function closeModal() {
  const modal = document.getElementById("thanks-modal");
  const modalText = document.querySelector('.modal-text');
  modalText.remove();
  modal.style.display = "none";
  clearInterval(intervalId);
  isCloseButtonClicked = false;
}


let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "Light Mode";
  } else {
    themeButton.textContent = "Dark Mode";
  }
}

themeButton.addEventListener("click", toggleDarkMode);

const signNowButton = document.querySelector(".sign-now-button");
let count = 6;

const addSignature = (person) => {
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  const oldCounter = document.getElementById("counter");
  oldCounter.remove();

  count = count + 1;
  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(newSignature);
  signaturesSection.appendChild(newCounter);
};

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.querySelectorAll('#sign-petition input');
  const email = document.getElementById('email');
  const validEmailEndings = ['.com', '.edu', '.org', '.net', '.io', '.gov'];
  const isValidEmail = validEmailEndings.some((ending) => email.value.includes(ending));
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (!isValidEmail) {
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }

  if (!containsErrors) {
    const person = {
      name: document.getElementById("name").value,
      hometown: document.getElementById("hometown").value,
      email: document.getElementById("email").value
    };
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
};

signNowButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm()
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
  isReduced: false,
};

const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
};

window.addEventListener('scroll', reveal);

const reduceMotion = () => {
  animation.isReduced = !animation.isReduced;

  if (animation.isReduced) {
    animation.transitionDuration = '0s';
    animation.revealDistance = 0;
    animation.initialOpacity = 0;
    animation.initialOpacity = 1;
  } else {
    animation.transitionDuration = '2s';
    animation.revealDistance = 150;
    animation.initialOpacity = 0;
  }

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transform = `translateY(${animation.revealDistance}px)`;
  }
};

const reduceMotionButton = document.getElementById("reduce-motion");
reduceMotionButton.addEventListener("click", reduceMotion);

// reduceMotion();

console.log(modalImage);

function scaleImage() {
  console.log("scaleImage called");
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

function closeThanksModal(event) {
  isCloseButtonClicked = true;
  closeModal();
}

