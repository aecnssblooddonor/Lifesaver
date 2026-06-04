let donors=[];

fetch("donors.json")
.then(response=>response.json())
.then(data=>{
donors=data;
});

function showDonors(){

let blood=document.getElementById("bloodGroup").value;

let filtered=donors.filter(
d=>d.blood===blood
);

let html="";

if(filtered.length===0){

html="<h3>No donors found</h3>";

}else{

html=`
<table>
<tr>
<th>Name</th>
<th>Department</th>
<th>Blood Group</th>
</tr>
`;

filtered.forEach(d=>{

html+=`
<tr>
<td>${d.name}</td>
<td>${d.department}</td>
<td>${d.blood}</td>
</tr>
`;

});

html+="</table>";

}

document.getElementById("results").innerHTML=html;

}
