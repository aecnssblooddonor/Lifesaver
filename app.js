let donors = [];

Papa.parse("donors.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        donors = results.data.map(row => ({
            name: row["Name of the Student "] || "",
            regno: row["Student Register Number"] || "",
            department: row["Name of the Department"] || "",
            year: row["Year of study"] || "",
            phone: row["Contact Number"] || "",
            email: row["Mail ID"] || "",
            blood: row["Blood Group Type"] || ""
        }));

        console.log("Loaded donors:", donors);
    },

    error: function(err) {
        console.error("CSV loading error:", err);
    }
});

function showDonors() {

    let blood = document.getElementById("bloodGroup").value;

    let filtered = donors.filter(
        d => d.blood.trim().toUpperCase() === blood.trim().toUpperCase()
    );

    let html = "";

    if (filtered.length === 0) {

        html = "<h3>No donors found</h3>";

    } else {

        html = `
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Blood Group</th>
            </tr>
        `;

        filtered.forEach(d => {

            html += `
            <tr>
                <td>${d.name}</td>
                <td>${d.department}</td>
                <td>${d.blood}</td>
            </tr>
            `;

        });

        html += "</table>";
    }

    document.getElementById("results").innerHTML = html;
}
