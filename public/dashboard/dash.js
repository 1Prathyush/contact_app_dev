/*const Data = [
	{ name: 'pr', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'prh', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'hyush', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'rath', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'prhh', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'prhyush', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'pryush', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'pryush', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'psh', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'prash', phno: '6784654', email: 'prathyush@asd' },
	{ name: 'ph', phno: '6784654', email: 'prathyush@asd' }
];
*/
let email = document.getElementById('email');
let names = document.getElementById('name');
let formContent = document.getElementById('login');
let phno = document.getElementById('phno');
let tbody = document.getElementById('tablebody');
let  userID = ""
window.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
	let path = window.location.pathname.split('/');
	const userid = path.pop();
    userID = userid
    viewtable(userid)

});
function viewtable(userid){
    fetch('/api/tables', {
		method: 'GET',
		headers: {
			uid: userid
		}
	})
		.then((response) => response.json())
		.then((Result) => {
			console.log(Result);
			if (Result.contacts.lenth != 0) {
				addtable(Result.contacts);
			}
		});
}

formContent.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log(email.value);
	console.log(names.value);
	console.log(phno.value);
  //  addtable(Data);
	fetch('/api/addData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
            uid:userID,
		},
		body: JSON.stringify({
			uemail: email.value,
			uname: names.value,
			uphno: phno.value,
		})
	})
		.then((response) => response.json()) // convert to json
		.then((data) => {
			console.log(data);
			console.log(data.contacts);
			appendData(data.contacts);
            window.location.reload();
		})
		.catch((err) => {
			console.log(err);
		});
});

function addtable(data) {
	data.forEach((ele) => {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
        td1.innerHTML = ele.cname;
        let td2 = document.createElement('td');
        td2.innerHTML = ele.phoneNumber;
        let td3 = document.createElement('td');
        td3.innerHTML = ele.cemail;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
	});
}

function appendData(datas){
    let ele = datas.pop();
    let tr = document.createElement('tr');
		let td1 = document.createElement('td');
        td1.innerHTML = ele.cname;
        let td2 = document.createElement('td');
        td2.innerHTML = ele.phoneNumber;
        let td3 = document.createElement('td');
        td3.innerHTML = ele.cemail;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
}
