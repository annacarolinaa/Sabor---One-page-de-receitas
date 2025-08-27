const carousel = document.querySelector(".carousel");
const chefs = document.querySelectorAll(".chef");
const nextBtn = document.querySelector(".next");

let index = 0;
const total = chefs.length;

function updateCarousel() {
  const cardWidth = chefs[0].offsetWidth + 20;
  carousel.style.transform = `translateX(${-index * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index >= total) {
    index = 0; 
  }
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);


/* ================== CURTIR FUNCIONAL ================== */
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card").innerHTML;
    let curtidos = JSON.parse(localStorage.getItem("curtidos")) || [];
    curtidos.push(card);
    localStorage.setItem("curtidos", JSON.stringify(curtidos));
    btn.style.background = "#A2FF8D";
    btn.innerText = "❤", style="color=#fff";;
  });
});


/* ================== FUNCIONAMENTO CARDDDDDD ================== */
const stars = document.querySelectorAll('.avaliacao span');
const like = document.querySelector('.like');
const prato = document.querySelector('.prato');
const comentarioBox = document.querySelector('.comentario-box');

let avaliacaoFeita = false;

// Clique nas estrelas
stars.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-star');
    
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < value; i++) {
      stars[i].classList.add('selected');
    }

    mostrarComentario();
  });
});

// Clique no coração
like.addEventListener('click', () => {
  like.classList.toggle('active');
  mostrarComentario();
});

function mostrarComentario() {
  if (!avaliacaoFeita) {
    prato.classList.add('expandido');
    comentarioBox.style.display = 'block';
    avaliacaoFeita = true;
  }
}


const guia = document.querySelector('.guia-avaliacao');
const guiaBadge = guia?.querySelector('.guia-badge');
const guiaSteps = guia?.querySelectorAll('.guia-step');
const barra = guia?.querySelector('.guia-progresso-barra');


const likeBtn = document.querySelector('.like');
const starEls = document.querySelectorAll('.avaliacao span');
const comentarioTextarea = document.querySelector('.comentario-box textarea');
const enviarBtn = document.querySelector('.comentario-box .enviar');

let sent = false;

function isLiked() {
  return likeBtn?.classList.contains('active');
}
function isRated() {
  return Array.from(starEls).some(s => s.classList.contains('selected'));
}
function hasComment() {
  return (comentarioTextarea?.value || '').trim().length > 0;
}

const stepsOrder = [
  { action: 'like',    done: () => isLiked() },
  { action: 'rate',    done: () => isRated() },
  { action: 'comment', done: () => hasComment() },
  { action: 'send',    done: () => sent }
];

function updateGuideBox() {
  if (!guia) return;

  const doneCount = stepsOrder.filter(s => s.done()).length;

  guia.hidden = false;

  if (doneCount === stepsOrder.length) {
    guiaSteps.forEach(li => li.style.display = 'none');
    guiaBadge.textContent = "Concluído!";
    barra.style.width = '100%';
    return;
  }

  const next = stepsOrder.find(s => !s.done());
  guiaSteps.forEach(li => {
    li.style.display = (li.dataset.action === next?.action) ? 'list-item' : 'none';
  });

  guiaBadge.textContent = `Passo ${doneCount + 1}`;

  barra.style.width = `${(doneCount / stepsOrder.length) * 100}%`;
}

likeBtn?.addEventListener('click', updateGuideBox);
starEls.forEach(s => s.addEventListener('click', updateGuideBox));
comentarioTextarea?.addEventListener('input', updateGuideBox);
enviarBtn?.addEventListener('click', () => {
  sent = true;
  updateGuideBox();
});

updateGuideBox();
