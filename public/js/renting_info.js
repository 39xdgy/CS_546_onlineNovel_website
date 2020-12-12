(function($) {

/*
let start_date = $("#start_date")

var disabledArr = ["12/24/2020","12/28/2020","12/17/2020","12/30/2020"];


$(document).ready( function() {
    start_date.datepicker({
        beforeShowDay: $.datepicker.noWeekends
    })
});


start_date.daterangepicker({

     isInvalidDate: function(arg){
         console.log(arg);

         // Prepare the date comparision
         var thisMonth = arg._d.getMonth()+1;   // Months are 0 based
         if (thisMonth<10){
             thisMonth = "0"+thisMonth; // Leading 0
         }
         var thisDate = arg._d.getDate();
         if (thisDate<10){
             thisDate = "0"+thisDate; // Leading 0
         }
         var thisYear = arg._d.getYear()+1900;   // Years are 1900 based

         var thisCompare = thisMonth +"/"+ thisDate +"/"+ thisYear;
         console.log(thisCompare);

         if($.inArray(thisCompare,disabledArr)!=-1){
             console.log("      ^--------- DATE FOUND HERE");
             return true;
         }
     }

}).focus();
*/

$('#start_date').change(function(){
    var toDate = $('#start_date').val();
    $('#end_date').prop("disabled", false);
    $("#end_date").attr("min", toDate);
    $("#end_date").val(toDate);
});


})(window.jQuery);