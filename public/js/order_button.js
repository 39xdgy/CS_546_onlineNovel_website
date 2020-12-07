(function($) {

    let acc_btn = $("#accept_button")
    let rej_btn = $("#reject_button")
    /*
    if($.session.get('AuthCookie') !== $("car_info").attr("car_owner")){
        acc_btn.attr('disabled', true)
        rej_btn.attr('disabled', true)
    }
    else */
    
    if($("#message").html() !== "Pending"){
        acc_btn.attr('disabled', true)
        rej_btn.attr('disabled', true)
    }
    else{
        acc_btn.attr('disabled', false)
        rej_btn.attr('disabled', false)
    }


    acc_btn.on('click', function(event) {
        event.preventDefault();
        
        let reqConfig = {
            method: 'POST',
            url: '/rentingInfo/confirm/approve/' + $('#order_id').html().split(": ")[1]
        }

        $.ajax(reqConfig).then(function (resMessage) {
            console.log("accepted")
            acc_btn.attr('disabled', true)
            rej_btn.attr('disabled', true)
        }) 
        
    })

    
    rej_btn.on('click', function(event) {
        
        event.preventDefault();
        let reqConfig = {
            method: "POST", 
            url: '/rentingInfo/confirm/reject/' + $('#order_id').html().split(": ")[1]
        }
        $.ajax(reqConfig).then(function (resMessage) {
            console.log("rejected")
            acc_btn.attr('disabled', true)
            rej_btn.attr('disabled', true)
        })

        
    })
    
})(window.jQuery)