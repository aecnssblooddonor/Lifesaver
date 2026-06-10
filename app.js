let donors = [];

Papa.parse("donors.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        donors = results.data.map(row => ({
            name: (row["Name of the Student "] || "").trim(),
            regno: (row["Student Register Number"] || "").trim(),
            department: (row["Name of the Department"] || "").trim(),
            year: (row["Year of study"] || "").trim(),
            phone: (row["Contact Number"] || "").trim(),
            email: (row["Mail ID"] || "").trim(),
            blood: (row["Blood Group Type"] || "").trim().toUpperCase()
        }));

        console.log("Total Donors Loaded:", donors.length);
    },

    error: function(err) {
        console.error("CSV Error:", err);
    }
});

function showDonors() {

    const blood = document.getElementById("bloodGroup").value
        .trim()
        .toUpperCase();

    const filtered = donors.filter(
        d => d.blood === blood
    );

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    let html = "";

    if (filtered.length === 0) {

        html = "<h3>No donors found</h3>";

    } else {

html = `
<table border="1" cellpadding="10">
    <tr>
        <th>Register No</th>
        <th>Name</th>
        <th>Department</th>
        <th>Year</th>
        <th>Blood Group</th>
        ${isAdmin ? "<th>Phone Number</th>" : ""}
    </tr>
`;

filtered.forEach(d => {

    html += `
    <tr>
        <td>${d.regno}</td>
        <td>${d.name}</td>
        <td>${d.department}</td>
        <td>${d.year}</td>
        <td>${d.blood}</td>
        ${isAdmin ? `<td>${d.phone}</td>` : ""}
    </tr>
    `;
});

html += "</table>";
    }

    document.getElementById("results").innerHTML = html;
}

function logout() {
    localStorage.removeItem("isAdmin");
    alert("Admin Logged Out");
    location.reload();
}
