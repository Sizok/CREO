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
    
    for( const elem of input){
        window.intlTelInput(elem, {
        initialCountry: "Ua", //change according to your own country.      
        utilsScript: "js/utils.js",
        separateDialCode: true,
        preferredCountries: ['ua']
        });
    }
    
});

  