const postsData = [
    { title: 'Post sobre Tecnologia 1', category: 'tecnologia', img: 'assets/imagens/imagem-tecnologia-01.jpg' },
    { title: 'Post sobre Viagem 1', category: 'viagem', img: 'assets/imagens/imagem-viagem-01.jpg' },
    { title: 'Post sobre Culinária 1', category: 'culinaria', img: 'assets/imagens/imagem-culinaria-01.jpg' },
    { title: 'Post sobre Tecnologia 2', category: 'tecnologia', img: 'assets/imagens/imagem-tecnologia-02.jpg' },
    { title: 'Post sobre Viagem 2', category: 'viagem', img: 'assets/imagens/imagem-viagem-02.jpg' },
    { title: 'Post sobre Culinária 2', category: 'culinaria', img: 'assets/imagens/imagem-culinaria-02.jpg' },
    { title: 'Post sobre Tecnologia 3', category: 'tecnologia', img: 'assets/imagens/imagem-tecnologia-03.jpg' },
    { title: 'Post sobre Viagem 3', category: 'viagem', img: 'assets/imagens/imagem-viagem-03.jpg' },
    { title: 'Post sobre Culinária 3', category: 'culinaria', img: 'assets/imagens/imagem-culinaria-03.jpg' }
];

let currentCategory = 'all';
let postsPerPage = 6;
let currentIndex = 0;

const postList = document.getElementById('post-list');
const loadMoreBtn = document.getElementById('load-more');
const categoryButtons = document.querySelectorAll('.categories button');

function renderPosts(reset = false) {
    if (reset) {
        postList.innerHTML = '';
        currentIndex = 0;
    }
    const filteredPosts = currentCategory === 'all' ? postsData : postsData.filter(post => post.category === currentCategory);
    const nextPosts = filteredPosts.slice(currentIndex, currentIndex + postsPerPage);

    nextPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <img src="${post.img}" alt="${post.title}">
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        `;
        postList.appendChild(postEl);
    });

    currentIndex += postsPerPage;

    loadMoreBtn.style.display = currentIndex >= filteredPosts.length ? 'none' : 'block';
}

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        renderPosts(true);
    });
});

loadMoreBtn.addEventListener('click', () => {
    renderPosts();
});

window.addEventListener('scroll', () => {
    const btnTop = document.getElementById('back-to-top');
    if (window.scrollY > 200) {
        btnTop.style.display = 'block';
    } else {
        btnTop.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicializa com todos os posts
renderPosts(true);

// Rolagem suave da página
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 50;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
