document.addEventListener("DOMContentLoaded", () => {
  // Simpan elemen-elemen DOM
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = mobileMenuButton?.querySelector("i");
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("div[id]");
  
  // Toggle mobile menu dengan animasi
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      // Toggle menu visibility
      mobileMenu.classList.toggle("hidden");
      
      // Mengubah toggle icon antara bar dan logo x saat diklik
      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-times");
      }
    });
  }
  
  // Fungsi untuk menetapkan link yang aktif
  function setActiveLink(linkElement) {
    // Hapus kelas aktif dari semua link desktop
    navLinks.forEach((link) => {
      link.classList.remove("after:w-full");
      link.classList.add("after:w-0");
    });
    
    // Tambahkan kelas aktif ke link yang diklik
    linkElement.classList.remove("after:w-0");
    linkElement.classList.add("after:w-full");
  }
  
  // Fungsi untuk mendapatkan bagian halaman saat ini berdasarkan posisi scroll
  function getCurrentSection() {
    let currentSection = "";
    
    for (const section of sections) {
      // Mengambil posisi bagian relatif terhadap viewport
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      
      // Periksa apakah bagian ini terlihat di viewport
      if (sectionTop <= 100 && sectionBottom > 0) {
        currentSection = section.getAttribute("id");
        break; // Hentikan loop untuk performa lebih baik
      }
    }
    
    return currentSection;
  }
  
  // Fungsi untuk memperbarui link aktif berdasarkan posisi scroll
  function updateActiveLink() {
    const currentSection = getCurrentSection();
    
    if (currentSection) {
      // Temukan link yang sesuai dengan bagian saat ini
      const activeLink = Array.from(navLinks).find(
        (link) => link.getAttribute("href") === `#${currentSection}`
      );
      
      if (activeLink) {
        setActiveLink(activeLink);
      }
    }
  }
  
  // Tambahkan click handler untuk link desktop
  navLinks.forEach((link) => {
    link.addEventListener("click", function(e) {
      // Ambil ID target dari href
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        e.preventDefault();
        
        // Smooth Scroll ke bagian target
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Offset for the fixed navbar
          behavior: "smooth",
        });
        
        // Tandai link ini sebagai aktif
        setActiveLink(this);
      }
    });
  });
  
  // Mengatur click handler untuk link mobile
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        e.preventDefault();
        
        // Smooth scroll ke bagian target
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Offset untuk navbar tetap
          behavior: "smooth",
        });
        
        // Temukan link desktop yang sesuai dan aktifkan
        const desktopLink = Array.from(navLinks).find(
          (link) => link.getAttribute("href") === href
        );
        
        if (desktopLink) {
          setActiveLink(desktopLink);
        }
        
        // Sembunyikan menu mobile
        mobileMenu.classList.add("hidden");
        
        // Ubah ikon ke bar
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  });
  
  // Tambahkan event scroll dengan throttling untuk performa lebih baik
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Tetapkan link aktif awal berdasarkan posisi scroll saat ini
  updateActiveLink();
  
  // Jika tidak ada bagian yang terlihat, default ke Home
  if (!getCurrentSection()) {
    const homeLink = Array.from(navLinks).find(
      (link) => link.getAttribute("href") === "#home"
    );
    if (homeLink) setActiveLink(homeLink);
  }
});