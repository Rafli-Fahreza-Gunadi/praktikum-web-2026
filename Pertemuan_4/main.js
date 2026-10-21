
 // File: main.js
// Integrasi Logika Data dan Render ke Elemen DOM

const projects = [
    {
        id: 1,
        title: "Sistem Inventaris Keuangan",
        category: "Web App",
        budget: 2500000,
        completed: true
    },
    {
        id: 2,
        title: "Sistem Kasir Digital POS",
        category: "Desktop App",
        budget: 5000000,
        completed: true
    },
    {
        id: 3,
        title: "Landing Page Profil Perusahaan",
        category: "Web App",
        budget: 1500000,
        completed: false
    },
    {
        id: 4,
        title: "Aplikasi Presensi GPS Mobile",
        category: "Mobile App",
        budget: 4500000,
        completed: false
    }
];

// Format angka menjadi Rupiah
const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
};

// Memperbarui statistik proyek
const updateStats = (dataList) => {
    const totalProjects = dataList.length;

    const totalBudget = dataList.reduce(
        (acc, curr) => acc + curr.budget,
        0
    );

    const completedCount = dataList.filter(
        item => item.completed
    ).length;

    document.getElementById("stat-total-projects").textContent =
        totalProjects;

    document.getElementById("stat-total-budget").textContent =
        formatRupiah(totalBudget);

    document.getElementById("stat-completed-projects").textContent =
        completedCount;
};

// Menampilkan daftar proyek ke elemen DOM
const renderProjects = (filteredList) => {
    const container = document.getElementById("project-list");

    if (!container) return;

    // Menampilkan pesan jika tidak ada proyek
    if (filteredList.length === 0) {
        container.innerHTML = `
            <p style="text-align: center; color: #64748b; padding: 20px;">
                Tidak ada proyek pada kategori ini.
            </p>
        `;
        return;
    }

    // Membuat HTML untuk setiap proyek
    const htmlString = filteredList.map(proj => {
        const badgeClass = proj.completed
            ? "badge-success"
            : "badge-pending";

        const statusText = proj.completed
            ? "Selesai"
            : "Dalam Pengerjaan";

        return `
            <div class="project-card">
                <div class="project-info">
                    <span class="project-category">
                        ${proj.category}
                    </span>

                    <h4>${proj.title}</h4>

                    <p class="project-budget">
                        ${formatRupiah(proj.budget)}
                    </p>
                </div>

                <div>
                    <span class="badge ${badgeClass}">
                        ${statusText}
                    </span>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = htmlString;
};

// Menjalankan program setelah DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Menampilkan seluruh proyek dan memperbarui statistik
    renderProjects(projects);
    updateStats(projects);

    // Mengambil semua tombol filter
    const filterButtons = document.querySelectorAll(".btn-filter");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Mengatur tombol yang sedang aktif
            filterButtons.forEach(button => {
                button.classList.remove("active");
            });

            e.currentTarget.classList.add("active");

            // Mengambil kategori yang dipilih
            const selectedCategory =
                e.currentTarget.getAttribute("data-category");

            // Menampilkan proyek berdasarkan kategori
            if (selectedCategory === "Semua") {
                renderProjects(projects);
            } else {
                const filtered = projects.filter(
                    p => p.category === selectedCategory
                );

                renderProjects(filtered);
            }
        });
    });
});
