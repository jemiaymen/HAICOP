
function formempty(){
    $("#OldPassword").val("");
    $("#Password").val("");
    $("#ConfirmPassword").val("");
}

 $('#changepassform').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
                url: $(this).attr('action'), 
                type: $(this).attr('method'), 
                data: $(this).serialize(), 
                success: function(html) { 
                    console.log(html);
                    if(html == true){
                        console.log(html);
                        $.amaran( {
                        content: {
                            message: "تمت عملية تغير كلمة السر بنجاح", size: "", file: "", icon: "fa fa fa-check"
                        }
                        , theme:"default ok", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                    });
                    formempty();
                    }else {
                        $.amaran( {
                        content: {
                            message: "هناك خطأ تثبت من كلمة السر", size: "", file: "", icon: "fa fa fa-times"
                        }
                        , theme:"default error", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                        });
                    }
                },
                error : function(err){
                    $.amaran( {
                        content: {
                            message: "هناك خطأ تثبت", size: "", file: "", icon: "fa fa fa-times"
                        }
                        , theme:"default error", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                        });
                }
        });
        
});  


 $('#changeprofileform').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
                url: $(this).attr('action'), 
                type: $(this).attr('method'), 
                data: $(this).serialize(), 
                success: function(html) { 
                    console.log(html);
                    if(html == true){
                        console.log(html);
                        $.amaran( {
                        content: {
                            message: "لقد تمت تغير المعطيات الشخصية بنجاح", size: "", file: "", icon: "fa fa fa-check"
                        }
                        , theme:"default ok", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                    });

                    }else {
                        $.amaran( {
                        content: {
                            message: "هناك خطأ", size: "", file: "", icon: "fa fa fa-times"
                        }
                        , theme:"default error", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                        });
                    }
                },
                error : function(err){
                     $.amaran( {
                        content: {
                            message: "هناك خطأ", size: "", file: "", icon: "fa fa fa-times"
                        }
                        , theme:"default error", position:"top left", inEffect:"slideLeft", outEffect:"slideTop", closeButton:true , delay:4000
                        });
                }
        });
        
});  