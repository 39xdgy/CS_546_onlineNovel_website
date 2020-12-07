


let start_date = document.getElementById("start_date")




$('#start_date').change(function(){
    var toDate = $('#start_date').val();
    $('#end_date').prop("disabled", false);
    $("#end_date").attr("min", toDate);
    $("#end_date").val(toDate);
});


