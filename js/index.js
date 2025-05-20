$(document).ready(function(){
 // Toggle password
  $('#togglePassword').on('click', function () {
    const password = $('#password');
    const type = password.attr('type') === 'password' ? 'text' : 'password';
    password.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  // Toggle confirm password
  $('#toggleConfirmPassword').on('click', function () {
    const confirmPassword = $('#confirmPassword');
    const type = confirmPassword.attr('type') === 'password' ? 'text' : 'password';
    confirmPassword.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });
















});