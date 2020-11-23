$(function(){

  function buildHTML(post){
   if ( post.image ) {
     var html =
     `<div class="post">
       <div class="upper-post">
         <div class="upper-post__user-name">
           ${post.user_name}
         </div>
           <div class="upper-post__date">
             ${post.created_at}
           </div>
         </div>
         <div class="lower-post">
           <p class="lower-post__content">
             ${post.content}
           </p>
         </div>
         <img src=${post.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="post" data-post-id=${post.id}>
         <div class="upper-post">
           <div class="upper-post__user-name">
             ${post.user_name}
           </div>
           <div class="upper-post__date">
             ${post.created_at}
           </div>
         </div>
         <div class="lower-post">
           <p class="lower-post__content">
             ${post.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_post').on('submit', function(e){

 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
 .done(function(data){
   var html = buildHTML(data);
   $('.posts').append(html);
   $('form')[0].reset();
   $('posts').animate({scrollTop:$('.posts')[0].scrollHeight});
   $(".form__submit").attr("disabled", false);
 })
 .fail(function() {
   alert("メッセージ送信に失敗しました");
 });
   var reloadPosts = function() {
   var last_post_id = $('.post:last').data("post-id");
   console.log(last_post_id)
   $.ajax({
     url: "api/posts",
     type: 'get',
     dataType: 'json',
     data: {id: last_post_id}
   })
   .done(function(posts) {
     console.log("success")
     if (posts.length !== 0) {
       var insertHTML ='';

       $.each(posts,function(i, post) {
         insertHTML += buildHTML(post)
       });

       $('.posts').append(insertHTML);
       $('.posts').animate({ scrollTop: $('.posts')[0].scrollHeight});
     }
   })
   
   .fail(function() {
     alert('error');
   });
 };
 setInterval(reloadPosts, 7000);
});
});


