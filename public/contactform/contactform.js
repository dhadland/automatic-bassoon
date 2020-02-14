jQuery(document).ready(function($){
    $('body').on('submit', 'form', function () {
        var form = $(this),
            action = form.attr('action'),
            data = new FormData(this)
        ;
        $.ajax({
            type: "POST",
            url: action,
            data: data,
            contentType: false,
            cache: false,
            processData:false,
            success: function(response) {
                if(response == 'reload'){
                    location.reload(true);
                }else if( response  == 'success' ){
                    $("#sendmessage").addClass("show");
                    $("#errormessage").removeClass("show");
                }else if( response.split(':')[0]  == 'error' ){ // error: User Not found
                    $("#sendmessage").removeClass("show");
                    $("#errormessage").addClass("show");
                    $('#errormessage').html( response.split(':')[1] );
                }else{
                    $("#sendmessage").removeClass("show");
                    $("#errormessage").addClass("show");
                    $('#errormessage').html( 'Unknow Error!' );
                }
            }
        });
        return false;
    });

    $('body').on('change', '#profile', function(e){
        e.preventDefault();
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (r) {
                $('.about-img img').attr('src', r.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});