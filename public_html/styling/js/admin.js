(function () {
    var url = window.location.pathname;
        url = filename = url.substring(url.lastIndexOf('/')+1);

    console.log("Current URL filename - " + url)

    if(url == "kabler"){
        getCableTypes();
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
function getCableTypes() {
    console.log("Get Cable Types")
    var placeholder_ = document.querySelector('#cable_lend_type');


    fetch('http://localhost:3030/json/cable/types')
        .then(function (data) 
        {
            return data.json();
        })
        .then(function (cable_types) {
            cable_types.forEach(function (element) {
                var option = document.createElement('OPTION');
                    option.value = element.lend_out_option_id;

                var optionName = document.createTextNode(element.lend_out_option_name);
                    option.appendChild(optionName);

                placeholder_.appendChild(option);
            });
        })
}
function postCableLend(){
    event.preventDefault();
    
    let student_name =  document.querySelector('#cable_lend_name').value,
        cable_id =      document.querySelector('#cable_lend_type').value;

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
    let request = new Request('http://localhost:3030/json/cable/lend', init);
                
    fetch(request)
        .then(response => 
            {
                console.log("Succes",response)
                window.location=('http://localhost:3030/cPanel/kabler');
            })
        .catch(err => 
            {   
                console.log("Fejlbesked",err, request)
            });
}
function deleteLend(lend_id){
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
    let request = new Request('http://localhost:3030/json/cable/lend/delete', init);
                
    fetch(request)
        .then(response => 
            {
                console.log("Succes",response)
                window.location=('http://localhost:3030/cPanel/kabler');
            })
        .catch(err => 
            {   
                console.log("Fejlbesked",err, request)
            });
}