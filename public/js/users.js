
let createForm =  document.getElementById('usercreation-form-id');
let submitBtn =  document.getElementById('submit-id');
//let editForm = $('#useredit-form-id');
let li;
if(createForm){
    
    createForm.addEventListener('submit',(event) =>{
        $('ul').empty();
        $('#routeserror-list-id').empty();
        event.preventDefault();

        let firstName = $('#firstName-id').val();
        if(!firstName.trim())
        {
        li ='<li> First Name : Sent parameter is missing</li>';
        $('#errorlist-id').append(li);
        $('#firstName-id').val('');
        }

        if(!firstName.trim().match("^[a-zA-Z]+$"))
        {
        li ='<li> First Name : Sent parameter should only contain alphabets</li>';
        $('#errorlist-id').append(li);
        $('#firstName-id').val('');
        }

        let lastName = $('#lastName-id').val();
        if(lastName.trim()){
        if(!lastName.trim().match("^[a-zA-Z]+$"))
        {
        li ='<li> Last Name : Sent parameter should only contain alphabets</li>';
        $('#errorlist-id').append(li);
        $('#lastName-id').val('');
        }

        }

        if(!($('#email-id').val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)))
        {
         li ='<li> Email Id : Sent parameter is invalid email address</li>';
        $('#errorlist-id').append(li);
        $('#email-id').val('');
        
        }

        if(($('#password-id').val() != $('#confirm-id').val()))
        {
         li ='<li> Password and  Confirm Password are not same</li>';
        $('#errorlist-id').append(li);
        $('#password-id').val('');
        $('#confirm-id').val('');
        }

        let license=$('#driverLicense-id').val();
        if(!license.match("^[0-9a-zA-Z]+$"))
        {
         li ='<li>Driver License : Sent parameter should only contain numbers and alphabets </li>';
        $('#errorlist-id').append(li);
        $('#driverLicense-id').val('');
        
        }

        if($('#zip-id').val().length!=5)
        {
         li ='<li>Zip : Sent parameter should be five digits long.</li>';
        $('#errorlist-id').append(li);
        $('#zip-id').val('');
        
        }

        if($("#errorlist-id").has("li").length == 0) 
            createForm.submit();
        

    });



}

    
 







