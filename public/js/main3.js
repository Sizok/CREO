let url = '/marathon';

let elem = document.getElementById("greenBar");
if (elem) {
  setTimeout(move(elem), 500)
};

function move(element) {

    let elem = element;
    let stepValue = 0;
    let id = setInterval(frame, 100);
  
    function frame() {
  
      if (stepValue >= 70) {
        clearInterval(id);
        
      } else {
        elem.style.width = (stepValue + 10) + "%";
        stepValue=(stepValue + 10);
      }
    }
  }

  //scroll
$('a[href*="#"]').on('click', function (e) {
    e.preventDefault()
  
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top,
      },
      500,
      'linear'
    )
  })
  // Select all links with hashes

  document.addEventListener('DOMContentLoaded', function(){
    var input = document.querySelectorAll("#phone");
    let inputArr = [];
    for( const elem of input){
        let input = window.intlTelInput(elem, {
        initialCountry: "Ua", //change according to your own country.      
        utilsScript: "js/utils.js",
        separateDialCode: true,
        preferredCountries: ['ua']
        });
        inputArr.push(input);
    }
    $('form[name="marathoneForm"]').submit( function(e){
      e.preventDefault();
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      let user = {
          name: e.target[0].value,
          phone: '',
          email: e.target[1].value,
          formName: e.target.name,
          utmSource: urlParams.get('utm_source'),
          utmMedium: urlParams.get('utm_medium'),
          utmCampaign: urlParams.get('utm_campaign'),
          url: window.location.href
      };
      var iti = inputArr[0];
      user.phone = iti.getNumber();
      let request = $.post(url, user);
      request.done(function(data){
          if(data == "OK") {window.location = '/welcomeuiux';}
          else{alert("OOPS, data is not be send to server. Please refresh this page and try again.");}
      })
    });
});

  