(function () {
    var url = window.location.pathname;
        url = filename = url.substring(url.lastIndexOf('/')+1);

    console.log("Current URL filename - " + url)

    if(url == "lend"){
        getLendTypes();
    }
    
})();
/* Check In Scripts */
function postStudentCheckIn(){
    event.preventDefault();
    let check_name      =  document.querySelector('#check_in_name').value,
        check_phone     =  document.querySelector('#check_in_phone').value,
        check_cpr       =  document.querySelector('#check_in_cpr').value,
        check_message   =  document.querySelector('#check_in_message').value,
        check_email     =  document.querySelector('#check_in_email').value,
        check_elevPlan  =  document.querySelector('#check_in_elevPlan').value,
        check_eventId   =  document.querySelector('#check_in_event').value
    
    if( check_name == "" || check_phone == "" || check_cpr == "" || check_email == "" || check_elevPlan == "" || check_eventId == ""){
        alert("Der er ikke udfyldt")
    }
    else {
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
    
        let init = {
                method: 'POST',
                headers: headers,
                body: `{
                    "check_name":"${check_name}",
                    "check_phone":"${check_phone}",
                    "check_cpr":"${check_cpr}",
                    "check_message":"${check_message}",
                    "check_email":"${check_email}",
                    "check_elevPlan":"${check_elevPlan}",
                    "check_eventId":"${check_eventId}"
                }`,
                cache: 'no-cache',
                mode: 'cors'
            };
        let request = new Request('http://localhost:3030/json/checkIn/new', init);
                
        fetch(request)
            .then(response => 
                {
                    console.log("Succes",response)
                    window.location=('http://localhost:3030/cPanel/checkIn');
                })
            .catch(err => 
                {   
                    console.log("Fejlbesked",err, request)
                });
    }
}


/* Lend Out Scripts */
function getLendTypes() {
    console.log("Get Cable Types")
    var placeholder_read_lend   = document.querySelector('#cable_lend_type'),
        placeholder_update_lend = document.querySelector('#edit_lend_type'),
        placeholder_delete_lend = document.querySelector('#delete_lend_type');


    fetch('http://localhost:3030/json/lend/type/all')
        .then(function (data) 
        {
            return data.json();
        })
        .then(function (cable_types) {
            appendLendTypes(cable_types, placeholder_read_lend)
            appendLendTypes(cable_types, placeholder_update_lend)
            appendLendTypes(cable_types, placeholder_delete_lend)
        })
}
function postNewLend(){
    event.preventDefault();
    
    let student_name =  document.querySelector('#cable_lend_name').value,
        cable_id =      document.querySelector('#cable_lend_type').value;

    if(student_name == "" || cable_id == null){
        alert("Der er ikke udfyldt!")
    }else{
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
        
        let init = {
                method: 'POST',
                headers: headers,
                body: `{
                    "student":"${student_name}",
                    "cable":"${cable_id}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };
        let request = new Request('http://localhost:3030/json/lend/new', init);
                    
        fetch(request)
            .then(response => 
                {
                    console.log("Succes",response)
                    window.location=('http://localhost:3030/cPanel/lend');
                })
            .catch(err => 
                {   
                    console.log("Fejlbesked",err, request)
                });
    }
}
function deleteLend(lend_id){
    
    var confirmDelete = confirm("Er du sikker?");
    if (confirmDelete == true) {
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
        
        let init = {
                method: 'POST',
                headers: headers,
                body: `{
                    "lend_id":"${lend_id}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };
        let request = new Request('http://localhost:3030/json/lend/delete', init);
                    
        fetch(request)
            .then(response => 
                {
                    console.log("Succes",response)
                    window.location=('http://localhost:3030/cPanel/lend');
                })
            .catch(err => 
                {   
                    console.log("Fejlbesked",err, request)
                });
    }else {
        
    }
}
function appendLendTypes(cable_types, placeholder){
    cable_types.forEach(function (element) {
        var option = document.createElement('OPTION');
            option.value = element.lend_out_option_id;

        var optionName = document.createTextNode(element.lend_out_option_name);
            option.appendChild(optionName);

        placeholder.appendChild(option);
    });
}
function postNewLendType(){
    event.preventDefault();
    
    let new_lend_type_name =  document.querySelector('#new_lend_name').value;

    if(new_lend_type_name == ""){
        alert("Der er ikke udfyldt")
    }else{
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
    
        let init = {
                method: 'POST',
                headers: headers,
                body: `{
                    "new_lend_name":"${new_lend_type_name}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };
        let request = new Request('http://localhost:3030/json/lend/type/new', init);
                    
        fetch(request)
            .then(response => 
                {
                    console.log("Succes",response)
                    window.location=('http://localhost:3030/cPanel/lend');
                })
            .catch(err => 
                {   
                    console.log("Fejlbesked",err, request)
                });
    }

    
}
function editLendType(){
    event.preventDefault();
    
    let lend_type_id        = document.querySelector('#edit_lend_type').value,
        new_lend_type_name  =  document.querySelector('#edit_lend_name').value;

    if(new_lend_type_name == ""){
        alert("Der er ikke udfyldt" + new_lend_type_name)
    }else{
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
    
        let init = {
                method: 'PUT',
                headers: headers,
                body: `{
                    "lend_type_id":"${lend_type_id}",
                    "new_lend_name":"${new_lend_type_name}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };
        let request = new Request('http://localhost:3030/json/lend/type/edit', init);
                    
        fetch(request)
            .then(response => 
                {
                    console.log("Succes",response)
                    window.location=('http://localhost:3030/cPanel/lend');
                })
            .catch(err => 
                {   
                    console.log("Fejlbesked",err, request)
                });
    }
}

function deleteLendType(){
    let confirmDelete = confirm("Er du sikker?"),
        lend_type_id = document.querySelector('#delete_lend_type').value;

    if (confirmDelete == true) {
        checkIfLendTypeIsInUse(lend_type_id, function(checkIfInUse){
            console.log("Check returned - " + checkIfInUse)

            if(checkIfInUse == true){
                alert("Du kan ikke slette en type som er i brug.")
            }
            else{
                let headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                
                let init = {
                        method: 'POST',
                        headers: headers,
                        body: `{
                            "lend_type_id":"${lend_type_id}"}`,
                        cache: 'no-cache',
                        mode: 'cors'
                    };
                let request = new Request('http://localhost:3030/json/lend/type/delete', init);
                            
                fetch(request)
                    .then(response => 
                        {
                            console.log("Succes",response)
                            window.location=('http://localhost:3030/cPanel/lend');
                        })
                    .catch(err => 
                        {   
                            console.log("Fejlbesked",err, request)
                        });
            }
        });        
    }   
}

function checkIfLendTypeIsInUse(lend_type_id, deleteFunc ){
    let check = false;
    fetch('http://localhost:3030/json/lend/get')
        .then(function (data) 
        {
            return data.json();
        })
        .then(function (all_lends) {
            all_lends.forEach(function (element) {
                console.log("To be checked: " + lend_type_id)
                console.log("Check: " + element.fk_lend_out_options)
                if(lend_type_id == element.fk_lend_out_options){
                    console.log("Der var et match")
                    check = true;
                }
            });
            
            deleteFunc(check)
        })
        
}