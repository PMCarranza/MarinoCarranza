var name;
var emailAddress;
var comments;


// function to gather the contact info
function contact() {
    name = $('#user-name').val().trim();
    emailAddress = $('#user-email').val().trim();
    // phone = $('#phone').val().trim();
    comments = $('#message').val().trim();
};


// Email Validation
var access_key = '7f95822a0882fc130f048a764288d1c1';
var email_address = 'support@apilayer.com';
function validateEmail(cb) {
    // verify email address via AJAX call
    return $.ajax({
        url: 'https://apilayer.net/api/check?access_key=' + access_key + '&email=' + emailAddress,
        dataType: 'jsonp',
        success: function (json) {

            return json
        }
    });
};

// click event on submit button will get contact() to run
$('#send').on('click', async function (stop) {
    stop.preventDefault();
    contact();

    var validate = await validateEmail();
    const { format_valid, smtp_check } = validate;

    // if validEmail is true, alert to the user, enter in a valid email
    if (smtp_check === true && format_valid === true) {
        

        // Email.send({
        //     SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
        //     To : 'them@website.com',
        //     From : "you@isp.com",
        //     Subject : "This is the subject",
        //     Body : "And this is the body"
        // }).then(
        //   message => alert(message)
        // );

        Email.send({
            SecureToken: '365a37f7-4429-474a-8c2f-7c3f3036cf43',
            To: 'marino.carranza@gmail.com',    //my preferred email
            From: 'marinocarranza@hotmail.com',  //user input
            Subject: `${name} PORTFOLIO feedback`,    // user input
            Body: `${name} had this to say: ${comments}    ===>  Write back at ${emailAddress}`   // will come from user input in the comment form
        }).then(
            message => alert("Thank you for your feedback!")    // when email sends
        )}else {
        alert('Please provide valid email');    // when email is invalid
    };
    $('#contact-form').trigger("reset");
});
    // code source can be found here: https://www.smtpjs.com/
    // code with encryption available