(function($) {

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrow_value = tomorrow.toISOString().split('T')[0]

    let get_booked_arr = $("#start_date").attr('booked_date').split(',')
    let dateRange = [];
    function find_cloest_date(toDate, dateRange){
        for(let i in dateRange){
            let check_date = new Date(dateRange[i])
            if(check_date - toDate > 0){
                return check_date
            }
        }
        console.log("cannot find it")
    }

    $("#start_date").datepicker({
        beforeShowDay: function (date){
            for (let i in get_booked_arr){
                if(i % 2 === 1){
                    let startDate = new Date(get_booked_arr[i - 1]),
                        endDate = new Date(get_booked_arr[i])
                    startDate.setDate(startDate.getDate() + 1)
                    endDate.setDate(endDate.getDate() + 1)

                    for(let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)){
                        dateRange.push($.datepicker.formatDate('yy-mm-dd', d));
                    }
                }
            }
            let dateString = jQuery.datepicker.formatDate('yy-mm-dd', date)
            return [dateRange.indexOf(dateString) == -1]
        },
        minDate: tomorrow
    })

    $('#start_date').change(function(){
        
        var toDate = $('#start_date').val();
        $('#end_date').prop("disabled", false);
        let maxDate = find_cloest_date(new Date(toDate), dateRange)
        console.log(toDate, maxDate)
        $("#end_date").datepicker({
            minDate: new Date(toDate),
            maxDate: maxDate
        })

    });

})(window.jQuery);