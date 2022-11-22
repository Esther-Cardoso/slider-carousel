const carousel = document.querySelector('.carousel');
const firstImg = document.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHidIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? 'none' : 'block';
};

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth + 15; // pegando a largura da primeira imagem e adicionando 15px de margin
    // if clicked icon is left, reduce value form carousel scroll left else add to it
    // se o icone for cliclado reduzir o tamanho da imagem ou adiconar esse tamanho
    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHidIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff); // deixando esse valor positivo
  let firstImgWidth = firstImg.clientWidth + 15;
  // pegando o valor que precisa para deixar a imagem no centro
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  // atualizando o valor das variáveis ​​globais no evento mouse down
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  // rolagem de imagens/carrossel para a esquerda de acordo com o ponteiro do mouse
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add('dragging');
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHidIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
