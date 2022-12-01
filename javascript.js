// let userList = [];
// var formtest= document.getElementById("form1");
//     formtest.addEventListener("submit" , function(e){
//     e.preventDefault();
//     let n = e.target[0].value;
//     let i = e.target[1].value;
//     let ph = e.target[2].value;
//     let s = e.target[3].value;
//     let myData = {
//     name: n,
//     id: i,
//     phone: ph,
//     status: s,
//     };
//     userList.push(myData);
//     console.log(userList);

//     localStorage.setItem("userData", JSON.stringify(userList));
//     tableDataPopulate();

//     })

// display form data in table in html page    
// const tableDataPopulate = () => {
//     const allData = localStorage.getItem("userData");
//     const table = document.getElementById("user-table-data");
//     let userHtml = "";
//     userList.forEach((user, i) => {
//         userHtml += `<tr><td>${user.name}</td><td>${user.id}</td><td>${user.phone}</td><td>${user.status}</td>
//         <td><button>edit status</button></td>
//         <td><button></button></td>
        
//         </tr>`;
//     });
//     table.innerHTML = userHtml;
// };

function addUser(){
    var name = document.getElementById('name').value;
    var id = Math.random(2000);
    var phone = document.getElementById('phone').value;
    console.log(document.getElementById('status-1').checked)
    var status = document.getElementById('status-1').checked ? 
        document.getElementById('status-1').value : 
        document.getElementById('status-2').value ;
    var usersData = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];
    usersData.push({
        name: name,
        id: id,
        phone: phone,
        status: status,
    })
    console.log(usersData)
    localStorage.setItem('usersData',JSON.stringify(usersData));
    updateTable();
}

function updateTable(){
    const table = document.getElementById("user-table-data");
    table.innerHTML ='';
    var usersData = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];
    if(usersData.length != 0){
        usersData.forEach((user)=>{
            table.innerHTML+= `
            <tr>
                <td>${user.name}</td><td>${user.id}</td>
                <td>${user.phone}</td><td>${user.status}</td>
                <td><button onclick="toggleEditForm(${user.id})">edit status</button></td>
                <td><button onclick="deleteUser(${user.id})">delete</button></td>
            </tr>
            `;
        })
    }
}

function editUser(id){
    var status = document.getElementById('status-edit-1').checked ? 
        document.getElementById('status-edit-1').value : 
        document.getElementById('status-edit-2').value ;
    console.log(id)
    var usersData = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];
    if(usersData.length != 0){
        for(index in usersData){
            if(id == usersData[index].id){
                usersData[index].status = status;
                localStorage.setItem('usersData',JSON.stringify(usersData));
                break;
            }
        }
        document.getElementById('edit-form').innerHTML = '';
        updateTable();
    }
}
function toggleEditForm(id){
    var user = {};
    var usersData = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];
    for(index in usersData){
        if(id == usersData[index].id){
            user = usersData[index];
            break;
        }
    }
    var form = document.getElementById('edit-form');
    form.innerHTML =`
    <form>
        <h2>Edit form</h2>
        <p>id: <span>${user.id}</span></p><br>
        <p>name: <span>${user.name}</span></p><br>
        <label >status:</label><br>
        <label for="status-1">valid</label>
        <input type="radio" class="status" id="status-edit-1" value="valid" name="status-edit" ${ user.status == 'valid' ? 'checked' :''}><br>
        <label for="status-2">invalid</label>
        <input type="radio" class="status" id="status-edit-2" value="invalid" name="status-edit" ${ user.status == 'invalid' ? 'checked' :''}><br>
        <br>
        <input type="button" onclick="editUser(${id})" value="Edit">
    </form> 
    `;
}
function deleteUser(id){
    console.log(id)
    var usersData = localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [];
    if(usersData.length != 0){
        for(index in usersData){
            if(id == usersData[index].id){
                usersData.splice(index,1);
                localStorage.setItem('usersData',JSON.stringify(usersData));
                break;
            }
        }
        updateTable();
    }
}

window.onload= ()=>{
    updateTable();
}