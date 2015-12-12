
function postDataToSpreadSheet(){
      // Variable to hold request
      var request;
      // variable to display message after request response is completed
      var $popupContent = $('.content-wraper');
      var successMsg =  '<h3> Votre inscription a &eacute;t&eacute; bien enregistr&eacute;e. Merci!</h3>';
      var displaysuccessMsg = '<div class="grid-container">' + successMsg + '</div>';

      // Bind to the submit event of the form
      $("#registration").submit(function(event){
          // Abort any pending request
          if (request) {
              request.abort();
          }
          // setup some local variables
          var $form = $(this);
          var $shareLink = $('.shareLink');

          // Let's select and cache all the fields
          var $inputs = $form.find("input, button"); // select, button, textarea

          // Serialize the data in the form
          var serializedData = $form.serialize();

          // Let's disable the inputs for the duration of the Ajax request.
          // Note: we disable elements AFTER the form data has been serialized.
          // Disabled form elements will not be serialized.
          $inputs.prop("disabled", true);

          // Fire off the request to /form.php
          request = $.ajax({
              url: 'https://script.google.com/macros/s/AKfycbzNOvxFxXtM2VXcMVxHOaXEVf24JzzSzD5pn2aFFIJTWGF9qiU/exec',
              type: "post",
              data: serializedData,
              beforeSend: function(){
                var $submitBtn = $form.find('#submit-btn');
                $submitBtn.text('Patientez...');
                $submitBtn.prepend('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
              }
          });

          // Callback handler that will be called on success
          request.done(function (response, textStatus, jqXHR){
              // Log a message to the console
              $popupContent.html(displaysuccessMsg);
              $shareLink.fadeIn(2000).show();
          });

          // Callback handler that will be called on failure
          request.fail(function (jqXHR, textStatus, errorThrown){
              // Log the error to the console
              console.error(
                  "The following error occurred: "+
                  textStatus, errorThrown
              );
          });

          // Callback handler that will be called regardless
          // if the request failed or succeeded
          request.always(function () {
              // Reenable the inputs
              $inputs.prop("disabled", false);
          });

          // Prevent default posting of form
          event.preventDefault();
      });
} // end function definition




$('.registration-popup').magnificPopup({

  items: {
      src: 'registration-form.html',
      type: 'ajax'
  },
  callbacks: {
          ajaxContentAdded: function() {
            // After ajax content is loaded and appended to DOM
            postDataToSpreadSheet();
          } // code to excute upon requested content is loaded via ajax.      
        } // callback functions end.
}); // end magnificPopup ajax request


$('.submit-abstract-popup').magnificPopup({
  items:{
      src: 'abstract-submission-form.html',
      type: 'ajax'
  }
});


$('.icon-menu').on('click',function(){
  $('#show-menu-mobile').slideToggle();
});

// javascript for posting form elements to google spreadshit.


