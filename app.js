let donors = [];

// Load donors.csv
Papa.parse("donors.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        console.log("Headers:", results.meta.fields);

        donors = results.data.map(row => ({
            name: row["Name of the Student "] || row["Name of the Student"] || "",
            regno: row["Student Register Number"] || "",
            department: row["Name of the Department"] || "",
            year: row["Year of study"] || "",
            phone: row["Contact Number"] || "",
            email: row["Mail ID"] || "",
            blood: row["Blood Group Type"] || ""
        }));

        console.log("Loaded Donors:", donors);
    },

    error: function(error) {
        console.error("CSV Loading Error:", error);
    }
});

function showDonors() {

    let blood = document.getElementById("bloodGroup").value;

    if (blood === "") {
        alert("Please select a blood group");
        return;
    }

    let filtered = donors.filter(
        donor => donor.blood.trim().toUpperCase() === blood.toUpperCase()
    );

    let html = "";

    if (filtered.length === 0) {

        html = "<h3>No donors found</h3>";

    } else {

        html = `
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Blood Group</th>
                <th>Phone</th>
            </tr>
        `;

        filtered.forEach(donor => {

            html += `
            <tr>
                <td>${donor.name}</td>
                <td>${donor.department}</td>
                <td>${donor.blood}</td>
                <td>${donor.phone}</td>
            </tr>
            `;

        });

        html += "</table>";
    }

    document.getElementById("results").innerHTML = html;
}
