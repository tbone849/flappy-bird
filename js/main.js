$( document ).ready(function() {
  $("#1").velocity("transition.swoopIn", { duration: 500 });
  $("#2").velocity("transition.swoopIn", { duration: 500, delay: 250 });
  $("#3").velocity("transition.swoopIn", { duration: 500, delay: 500 });
});