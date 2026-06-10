let donors = [];

Papa.parse("donors.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {

    console.log("Headers Found:");
    console.table(results.meta.fields);

    console.log("First Row:");
    console.log(results.data[0]);

}

        console.log("Loaded Donors:", donors);
    },

    error: function(err) {
        console.error("CSV Error:", err);
    }
});

function showDonors() {

    const blood = document.getElementById("bloodGroup").value.trim().toUpperCase();

    const filtered = donors.filter(d => d.blood === blood);

    console.log("Selected:", blood);
    console.log("Matches:", filtered);

    let html = "";

    if (filtered.length === 0) {

        html = "<h3>No donors found</h3>";

    } else {

        html = `
        <table border="1" cellpadding="10">
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Blood Group</th>
                <th>Phone</th>
            </tr>
        `;

        filtered.forEach(d => {
            html += `
            <tr>
                <td>${d.name}</td>
                <td>${d.department}</td>
                <td>${d.blood}</td>
                <td>${d.phone}</td>
            </tr>
            `;
        });

        html += "</table>";
    }

    document.getElementById("results").innerHTML = html;
}
