jQuery(document).ready(function(a) {
    forgo_password_view();
});



function forgo_password_view() {
    $(".forgot-password, .login-view").click(function() {
        $(".login-form, .forgot-pass-box").slideToggle("slow")
    })
}


