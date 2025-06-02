document.addEventListener("DOMContentLoaded", () => {
  // Gunakan const untuk elemen yang tidak akan diubah
  const marqueeContainer = document.querySelector(".services-marquee");
  const marqueeTrack = document.querySelector(".services-track");

  if (!marqueeContainer || !marqueeTrack) return;

  // Hentikan animasi CSS yang sudah ada
  marqueeTrack.style.animation = "none";

  // Pastikan kontainer memiliki overflow tersembunyi
  marqueeContainer.style.overflow = "hidden";

  // Gandakan konten untuk efek scroll tak terbatas
  marqueeTrack.innerHTML = marqueeTrack.innerHTML + marqueeTrack.innerHTML;

  // Variabel untuk scroll manual
  let isDragging = false;
  let startPosition = 0;
  let currentPosition = 0;
  let animationId = null;
  let currentTranslate = 0;
  const autoScrollSpeed = 1; // Kecepatan scroll otomatis (piksel per frame)

  // Fungsi scroll otomatis menggunakan requestAnimationFrame untuk performa lebih baik
  function autoScroll() {
    if (!isDragging) {
      currentTranslate -= autoScrollSpeed;

      // Reset posisi saat sudah melewati setengah konten
      const firstHalfWidth = marqueeTrack.scrollWidth / 2;
      if (Math.abs(currentTranslate) >= firstHalfWidth) {
        currentTranslate = 0;
      }

      // Gunakan transform untuk performa lebih baik
      marqueeTrack.style.transform = `translateX(${currentTranslate}px)`;
    }
    animationId = requestAnimationFrame(autoScroll);
  }

  // Mulai scroll otomatis
  animationId = requestAnimationFrame(autoScroll);

  // Fungsi bantu untuk mendapatkan posisi X
  function getPositionX(event) {
    return event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
  }

  // Delegasi event untuk performa lebih baik
  marqueeTrack.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = getPositionX(e);
    currentPosition = currentTranslate;
    marqueeTrack.style.cursor = "grabbing";
  });

  // Gunakan listener pasif untuk sentuhan agar performa lebih baik
  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      marqueeTrack.style.cursor = "grab";
    }
  }, { passive: true });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentX = getPositionX(e);
    const diff = currentX - startPosition;
    currentTranslate = currentPosition + diff;

    marqueeTrack.style.transform = `translateX(${currentTranslate}px)`;
  }, { passive: true });

  // Event sentuh dengan listener pasif
  marqueeTrack.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosition = getPositionX(e);
    currentPosition = currentTranslate;
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentX = getPositionX(e);
    const diff = currentX - startPosition;
    currentTranslate = currentPosition + diff;

    marqueeTrack.style.transform = `translateX(${currentTranslate}px)`;
  }, { passive: true });

  // Tambahkan kursor grab
  marqueeTrack.style.cursor = "grab";

  // Hentikan auto-scroll saat hover
  marqueeTrack.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationId);
  }, { passive: true });

  // Lanjutkan auto-scroll saat mouse keluar
  marqueeTrack.addEventListener("mouseleave", () => {
    if (!isDragging) {
      animationId = requestAnimationFrame(autoScroll);
    }
  }, { passive: true });
});