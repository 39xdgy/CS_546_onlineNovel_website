/*let carForm = document.getElementById('carcreation-form-id');
let submitBtn = document.getElementById('submit-id');
let li;
if(carForm){
    carForm.addEventListener('submit',(event) => {
        $('ul').empty();
        $('#routeserror-list-id').empty();
        event.preventDefault();

        let licensePlate = $('#licensePlate-id').val();
        if(!licensePlate.trim())
        {
            li='<li>License Plate: Sent parameter is missing</li>';
            $('#errorList-id').append(li);
            $('#licensePlate-id').val('');
        }

        if(!licensePlate.trim().match("^[a-zA-Z]+$"))
        {

        }
    })
}*/