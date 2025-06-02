document.addEventListener("DOMContentLoaded", () => {
  // Gunakan requestIdleCallback untuk menunda inisialisasi yang tidak kritis
  // Gunakan setTimeout jika browser tidak mendukungnya
  const requestIdleCallback = window.requestIdleCallback ||
    ((cb) => setTimeout(cb, 1));

  requestIdleCallback(() => {
    // Dapatkan semua tautan navigasi
    const desktopNavLinks = document.querySelectorAll(".desktop-nav-link");

    // Dapatkan semua bagian yang memiliki ID
    const sections = document.querySelectorAll("span[id]");

    // Fungsi untuk mengecek apakah kita sedang di halaman produk
    function isProductPage() {
      return window.location.pathname.includes('product.html') || window.location.pathname.endsWith('/route/product.html');
    }

    // Fungsi untuk mengatur status aktif untuk tautan Produk
    function setProductsLinkActive() {
      desktopNavLinks.forEach((link) => {
        const href = link.getAttribute("href");

        // Hapus status aktif dari semua tautan terlebih dahulu
        link.classList.remove("after:w-full");
        link.classList.add("after:w-0");

        // Periksa apakah ini tautan Produk dan kita sedang di halaman produk
        if ((href.includes('product.html') || href.includes('./route/product.html')) && isProductPage()) {
          link.classList.remove("after:w-0");
          link.classList.add("after:w-full");
        }
      });
    }

    // Fungsi untuk memperbarui tautan aktif berdasarkan posisi scroll
    function updateActiveNavOnScroll() {
      // Jika kita di halaman produk, tautan Produk tetap aktif
      if (isProductPage()) {
        setProductsLinkActive();
        return;
      }

      // Dapatkan posisi scroll saat ini dengan offset untuk navbar
      const scrollPosition = window.scrollY + 150;

      // Temukan bagian yang sedang ditampilkan
      let currentSection = "";

      // Periksa posisi setiap bagian
      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.parentElement.offsetHeight;

        // Periksa apakah kita sudah scroll ke bagian ini
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.getAttribute("id");
          break; // Hentikan loop setelah ditemukan untuk performa lebih baik
        }
      }

      // Jika tidak ditemukan bagian, default ke home
      if (!currentSection && scrollPosition < 300) {
        currentSection = "home";
      }

      // Perbarui tautan navigasi desktop
      if (currentSection) {
        desktopNavLinks.forEach((link) => {
          // Ambil atribut href dan ekstrak ID bagian
          const href = link.getAttribute("href");
          const linkSection = href.substring(href.indexOf('#') + 1);

          // Hapus status aktif dari semua tautan
          link.classList.remove("after:w-full");
          link.classList.add("after:w-0");

          // Tambahkan status aktif pada tautan bagian yang sesuai
          if (linkSection === currentSection) {
            link.classList.remove("after:w-0");
            link.classList.add("after:w-full");
          }
        });
      }
    }

    // Inisialisasi status aktif yang sesuai berdasarkan halaman saat ini
    if (isProductPage()) {
      setProductsLinkActive();
    } else {
      // Tambahkan event scroll dengan throttling untuk performa lebih baik
      let ticking = false;
      window.addEventListener("scroll", () => {
        if (!ticking) {
          // Gunakan requestAnimationFrame untuk performa lebih halus
          window.requestAnimationFrame(() => {
            updateActiveNavOnScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      // Panggil fungsi saat halaman dimuat untuk mengatur status awal
      updateActiveNavOnScroll();

      // Juga panggil setelah sedikit jeda untuk memastikan semuanya sudah dimuat
      setTimeout(updateActiveNavOnScroll, 500);
    }
  });
});