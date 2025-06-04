document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});

// carousel part //

 document.addEventListener('DOMContentLoaded', function() {
    const bikeContainers = document.querySelectorAll('.bike-item-container');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    // Initialize first card as active
    updateActiveCard();
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % bikeContainers.length;
      updateActiveCard();
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + bikeContainers.length) % bikeContainers.length;
      updateActiveCard();
    });
    
    // Dot click handlers
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        currentIndex = parseInt(this.getAttribute('data-index'));
        updateActiveCard();
      });
    });
    
    // Update active card and dots
    function updateActiveCard() {
      bikeContainers.forEach((container, index) => {
        if (index === currentIndex) {
          container.classList.add('active');
        } else {
          container.classList.remove('active');
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % bikeContainers.length;
      updateActiveCard();
    }, 5000);
  });