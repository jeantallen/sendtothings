// Wish list:
//     - Right now special characters get weird because all the information is sent
//       via URL encoding - I'd like to be able to use a percent sign in titles of
//       to-dos, or at the very least throw an error so the user knows not to use one
//     - Little thing, but I want to add some kind of header to the popup that says
//       "Send To Things [checkbox]" or something




window.addEventListener( "load", function () {
  function sendData() {
    // Update the submit button
    document.querySelector('#submit').value = 'Submitting...';
    document.querySelector('#submit').disabled = true

    // Read user-entered data from form.
    const FD = new FormData( form );
    var a1 = FD.get('Subject')
    var a2 = FD.get('Dest')
    var a3 = FD.get('HtmlBody')

    // Format user-entered data for the HTTP request
    var data = "{ \"task\": \""
                    .concat(a1)
                    .concat("\", \"recipient\": \"")
                    .concat(a2)
                    .concat("\", \"note\": \"")
                    .concat(a3)
                    .concat("\" }");

    // Create HTTP request
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", "https://khkpqwg2n6.execute-api.us-east-2.amazonaws.com/default/send_email");
    xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.onreadystatechange = function (oEvent) {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.responseText)
          } else {
            console.log("Error", xhr.statusText);
          }
      }
    };

    // Watch out for what happens!
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
          console.log(this.responseText);
          document.querySelector('#submit').value = 'Done!';
          document.queryselector('#submit').disabled = true;
      }
    });

    // Submit the request and send the task along!
    xhr.send(data);

  }

  // Access the form element...
  const form = document.getElementById( "myForm" );

  // ...and take over its submit event.
  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    sendData();
  } );
} );
