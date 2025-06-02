document.addEventListener("DOMContentLoaded", () => {
    const categoryTabs = document.querySelectorAll("[data-category]")
    const productGrid = document.getElementById("product-grid")

    fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
        renderProducts(products) // tampilkan semua produk saat load

        categoryTabs.forEach((tab) => {
            tab.addEventListener("click", (e) => {
            e.preventDefault()

            // Hapus class yang aktif dari semua tab dan ubah ke latar abu dengan teks biru
            categoryTabs.forEach((t) => {
                t.classList.remove("bg-[#131a2c]", "text-white")
                t.classList.add("bg-gray-200", "text-[#131a2c]")
            })

            // Tambahkan class yang aktif ke tab yang diklik - latar biru dengan teks putih
            tab.classList.remove("bg-gray-200", "text-[#131a2c]")
            tab.classList.add("bg-[#131a2c]", "text-white")

            const selectedCategory = tab.getAttribute("data-category")
            const filtered = selectedCategory === "all" ? products : products.filter((p) => p.id === selectedCategory)

            // Memanggil fungsi renderProducts dengan data yang telah di-filter
            renderProducts(filtered)
            })
        })

        // Fungsi untuk menampilkan produk dengan efek hover dan shadow yang enhanced
        function renderProducts(items) {
            productGrid.innerHTML =
            items
                .map(
                (p) => `
                        <div class="group flex flex-col items-start gap-2 bg-white border border-gray-200 rounded-xl px-4 py-4 shadow-lg hover:shadow-2xl hover:shadow-gray-400/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden">
                            <img src="/img/${p.image}" alt="${p.description}" class="rounded-xl w-full h-auto" loading="lazy">
                            <p class="text-gray-800 font-semibold text-left w-full text-sm sm:text-base group-hover:text-[#131a2c] transition-colors duration-300">${p.description}</p>
                        </div>
                    `,
                )
                .join("") +
            `
                        <div class="col-span-1 sm:col-span-2 lg:col-span-3 mt-4 sm:mt-6 lg:-translate-x-4">
                            <p class="text-gray-500 text-sm sm:text-base text-center lg:text-right font-medium cursor-default">
                                More on Tokopedia 
                                <span class="text-[#e94560] font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#e94560] after:transition-all after:duration-300 cursor-pointer">
                                    <a href="https://www.tokopedia.com/speedlustgarage?channel=" target="_blank" rel="noopener">Speedlust Garage</a>
                                </span>
                            </p>
                        </div>
                    `
        }
        })
        .catch((err) => console.error("Gagal mengambil data:", err))

    // Cek apakah kita berada di halaman product
    if (window.location.pathname.includes("product.html")) {
        const productsLink = document.getElementById("products-link")
        if (productsLink) {
        // Hapus class after:w-0 dan tambah after:w-full untuk menampilkan garis bawah
        productsLink.classList.remove("after:w-0")
        productsLink.classList.add("after:w-full")
        }
    }
})