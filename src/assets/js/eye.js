// $(function(){
//   $('.hide-show').show();
//   $('.hide-show span').addClass('show')
  
//   $('.hide-show span').click(function(){
//     if( $(this).hasClass('show') ) {
//       $(this).text('Hide');
//       $('input[name="login[password]"]').attr('type','text');
//       $(this).removeClass('show');
//     } else {
//        $(this).text('Show');
//        $('input[name="login[password]"]').attr('type','password');
//        $(this).addClass('show');
//     }
//   });
	
// 	$('form button[type="submit"]').on('click', function(){
// 		$('.hide-show span').text('Show').addClass('show');
// 		$('.hide-show').parent().find('input[name="login[password]"]').attr('type','password');
// 	}); 
// });
function password_show_hide() {
  var x = document.getElementById("password");
  var show_eye = document.getElementById("show_eye");
  var hide_eye = document.getElementById("hide_eye");
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}

function confirmpassword_show_hide() {
  var x = document.getElementById("confirmPassword");
  var show_eye = document.getElementById("show_eye");
  var hide_eye = document.getElementById("hide_eye");
  hide_eye.classList.remove("d-none");
  if (x.type === "confirmPassword") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "confirmPassword";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}