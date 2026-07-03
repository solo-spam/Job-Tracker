document.addEventListener("DOMContentLoaded", () => {
    // --- Password validation ---
    const form = document.getElementById("signupForm");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const errorMsg = document.getElementById("errorMsg");

    if (form && passwordInput && confirmInput && errorMsg) {
        form.addEventListener("submit", (e) => {
            if (passwordInput.value !== confirmInput.value) {
                e.preventDefault();
                errorMsg.textContent = "Passwords do not match!";
                passwordInput.focus();
            } else {
                errorMsg.textContent = "";
            }
        });
    }

    // --- Table filtering, sorting, tooltips ---
    const filter = document.getElementById("statusFilter");
    const table = document.getElementById("applicationsTable");

    if (filter && table) {
        const tbody = table.querySelector("tbody") || table;
        const thElements = table.querySelectorAll("th");

        // Filter logic...
        filter.addEventListener("change", function () { 
            const value = this.value.trim().toLowerCase();
            const rows = tbody.querySelectorAll("tr");

            rows.forEach(row => {
                const statusCell = row.children[2];
                const status = statusCell.innerText.trim().toLowerCase();

                if (!value) {
                    row.style.display = "";
                    row.classList.remove("highlighted");
                } else if (status === value) {
                    row.style.display = "";
                    row.classList.add("highlighted");
                } else {
                    row.style.display = "none";
                    row.classList.remove("highlighted");
                }
            });
        });

        // Sorting logic (combine loops into one)...
        
        thElements.forEach((th, index) => {
            if (th.innerText.toLowerCase() === "actions") return;

            th.dataset.order = th.dataset.order || "asc";;

            th.addEventListener("click", () => {
                const ascending = th.dataset.order === "asc";
                const rows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");

                rows.sort((a, b) => {
                    let aText = a.children[index].innerText.trim();
                    let bText = b.children[index].innerText.trim();

                    if (th.innerText.toLowerCase() === "applied date") {
                        const aDate = new Date(aText);
                        const bDate = new Date(bText);
                        return ascending ? aDate - bDate : bDate - aDate;
                    }

                    const aNum = parseFloat(aText.replace(/[^\d.-]/g, ''));
                    const bNum = parseFloat(bText.replace(/[^\d.-]/g, ''));
                    if (!isNaN(aNum) && !isNaN(bNum)) return ascending ? aNum - bNum : bNum - aNum;

                    aText = aText.toLowerCase();
                    bText = bText.toLowerCase();
                    return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
                });

                rows.forEach(row => tbody.appendChild(row));

                // Reset other headers
                thElements.forEach(header => {
                    if (header !== th) header.classList.remove("asc", "desc", "sorted-column");
                });

                th.dataset.order = ascending ? "desc" : "asc";

                th.classList.remove("asc", "desc");
                th.classList.add(ascending ? "asc" : "desc", "sorted-column");
            });
        });

        // Tooltips
        document.querySelectorAll('.note-tooltip').forEach(span => {
            const tooltip = span.querySelector('.tooltip-text');
            span.addEventListener('mousemove', e => {
                tooltip.style.setProperty('--x', e.pageX + 10 + 'px');
                tooltip.style.setProperty('--y', e.pageY + 10 + 'px');
            });
        });
    }
});


/*document.addEventListener("DOMContentLoaded", function () {
    const filter = document.getElementById("statusFilter");
    const table = document.getElementById("applicationsTable");

    if (!filter || !table) return;

    const tbody = table.querySelector("tbody") || table;

    // --- Filter rows based on status ---
    filter.addEventListener("change", function () {
        const value = this.value.trim().toLowerCase();
        const rows = tbody.querySelectorAll("tr");

        rows.forEach(row => {
            const statusCell = row.children[2];
            const status = statusCell.innerText.trim().toLowerCase();

            if (!value) {
                row.style.display = "";
                row.classList.remove("highlighted");
            } else if (status === value) {
                row.style.display = "";
                row.classList.add("highlighted");
            } else {
                row.style.display = "none";
                row.classList.remove("highlighted");
            }
        });
    });

    // --- Make table columns sortable ---
    table.querySelectorAll("th").forEach((th, index) => {
        // Skip Actions column (last column)
        if (th.innerText.trim().toLowerCase() === "actions") return;

        th.dataset.order = "asc";

        th.addEventListener("click", () => {
            const rows = Array.from(tbody.querySelectorAll("tr"));

            const ascending = th.dataset.order === "asc";

            rows.sort((a, b) => {
                let aText = a.children[index].innerText.trim();
                let bText = b.children[index].innerText.trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);

                if (!isNaN(aNum) && !isNaN(bNum)) return ascending ? aNum - bNum : bNum - aNum;

                aText = aText.toLowerCase();
                bText = bText.toLowerCase();
                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });

            rows.forEach(row => tbody.appendChild(row));

            // Reset other headers
            table.querySelectorAll("th").forEach(header => {
                if (header !== th) {
                    header.classList.remove("asc", "desc", "sorted-column");
                    header.dataset.order = "asc";
                }
            });

            // Update clicked header
            th.classList.remove("asc", "desc");
            th.classList.add(ascending ? "asc" : "desc", "sorted-column");
            th.dataset.order = ascending ? "desc" : "asc";
        });
    });
    const thElements = table.querySelectorAll("th");

    // --- Sorting ---
    thElements.forEach((th, index) => {
        // Skip Actions column
        if (th.innerText.toLowerCase() === "actions") return;

        th.addEventListener("click", () => {
            // Determine sort order based on current class
            const ascending = !th.classList.contains("asc");

            // Get only visible rows for sorting
            const rows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");

            rows.sort((a, b) => {
                let aText = a.children[index].innerText.trim();
                let bText = b.children[index].innerText.trim();

                // numeric sort if possible
                const aNum = parseFloat(aText.replace(/[^\d.-]/g, ''));
                const bNum = parseFloat(bText.replace(/[^\d.-]/g, ''));
                if (!isNaN(aNum) && !isNaN(bNum)) return ascending ? aNum - bNum : bNum - aNum;

                // string sort
                aText = aText.toLowerCase();
                bText = bText.toLowerCase();
                return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });

            rows.forEach(row => tbody.appendChild(row));

            // Reset other headers
            thElements.forEach(header => {
                if (header !== th) {
                    header.classList.remove("asc", "desc", "sorted-column");
                }
            });

            // Update clicked header
            th.classList.remove("asc", "desc");
            th.classList.add(ascending ? "asc" : "desc", "sorted-column");
        });
    });


    document.querySelectorAll('.note-tooltip').forEach(span => {
        const tooltip = span.querySelector('.tooltip-text');
        span.addEventListener('mousemove', e => {
            tooltip.style.setProperty('--x', e.pageX + 10 + 'px');
            tooltip.style.setProperty('--y', e.pageY + 10 + 'px');
        });
    });

    const form = document.getElementById("signupForm");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const errorMsg = document.getElementById("errorMsg");

    if (form && passwordInput && confirmInput && errorMsg) {
        form.addEventListener("submit", (e) => {
            if (passwordInput.value !== confirmInput.value) {
                e.preventDefault();
                errorMsg.textContent = "Passwords do not match!";
                passwordInput.focus();
            } else {
                errorMsg.textContent = "";
            }
        });
    }
});
*/
