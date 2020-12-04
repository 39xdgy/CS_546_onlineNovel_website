const mongoCollections = require('../config/mongoCollections');

const rentingInfo = mongoCollections.rentingInfo;

const date_info = document.getElementById('pick_date');

//const car_date_info = await rentingInfo(document.getElementById('car_id'));
/*
car_date_info = ["12-10-2020"]

if (!car_date_info){
    $('pick_date').datepicker({
        beforeShowDay: function(date){
            let string = jQuery.datepicker.formatDate('mm-dd-yyyy', date);
            return [$.inArray(string, array) == -1];
        }
    })
}

*/