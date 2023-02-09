let url = '/uiux';

/*---------------------------modal-window-form-----------------------------*/
document.addEventListener('DOMContentLoaded', function(){
    let modalBtn = document.querySelectorAll('#openModalFormBtn');
    let closeBtn = document.querySelector('#closeModalFormBtn');
    let modalWindow = document.querySelector('.modal-window-input-container');


    for(let elem of modalBtn){
        elem.addEventListener('click',function(e) {
            e.preventDefault();
            modalWindow.style.display = 'block';
        });
    }
    
    
    closeBtn.addEventListener('click',function(e) {
        e.preventDefault();
        modalWindow.style.display = 'none';
    });
    
    let modalVimeoBtn = document.querySelectorAll('#openModalVimeoBtn');
    let closeVimeoBtn = document.querySelector('#closeModalVimeoBtn');
    let modalVimeoWindow = document.querySelector('.modal-window-vimeo-container');

    for(let elem of modalVimeoBtn){
        elem.addEventListener('click',function(e) {
        e.preventDefault();
        modalVimeoWindow.style.display = 'block';
    });}
    
    
    closeVimeoBtn.addEventListener('click',function(e) {
        e.preventDefault();
        modalVimeoWindow.style.display = 'none';
    });
    

    let modalImgBtn = document.querySelectorAll('#openModalBtn');
    let closeImgBtn = document.querySelectorAll('#closeModalBtn');
    let modalImgWindow = document.querySelectorAll('.modal-window-img-container');
    let id;
// не відкриває бо є дваелементи із одинаковим ID
    for(let elem of modalImgBtn){
        elem.addEventListener('click',function(e) {
            e.preventDefault();
            id = e.target.dataset.id;
            for(elem of modalImgWindow){
                if(elem.dataset.id == id){
                    elem.style.display = 'block';
                }
            }
        });
    }
    
    for (let elem of closeImgBtn){
        elem.addEventListener('click',function(e) {
            e.preventDefault();
            modalImgWindow[id-1].style.display = 'none';
        })
    }
    
    window.onclick = function(e){
        if (e.target == modalImgWindow[id-1]) {
            modalImgWindow[id-1].style.display = 'none';
        }
        if (e.target == modalVimeoWindow) {
            modalVimeoWindow.style.display = 'none';
        }
        if (e.target == modalWindow) {
            modalWindow.style.display = 'none';
        }
    }
    
});

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

    $('form[name="uiuxMainForm"]').submit( function(e){
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
            utmCampaign: urlParams.get('utm_campaign')
        };
        var iti = inputArr[0];
        user.phone = iti.getNumber();
        let request = $.post(url, user);
        request.done(function(data){
            if(data == "OK") {window.location = '/welcomeuiux';}
            else{alert("OOPS, data is not be send to server. Please refresh this page and try again.");}
        })
        });
    $('form[name="uiuxSeconsdForm"]').submit( function(e){
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
                utmCampaign: urlParams.get('utm_campaign')
            };
            var iti = inputArr[1];
            user.phone = iti.getNumber();
            
            

            let request = $.post(url, user);
            request.done(function(data){
                if(data == "OK") {window.location = '/welcomeuiux';}
                else{alert("OOPS, data is not be send to server. Please refresh this page and try again.");}
            })
        });
    $('form[name="uiuxThirdForm"]').submit( function(e){
            e.preventDefault();
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            
            let user = {
                name: e.target[0].value,
                phone: '',
                email: e.target[1].value ,
                formName: e.target.name,
                utmSource: urlParams.get('utm_source'),
                utmMedium: urlParams.get('utm_medium'),
                utmCampaign: urlParams.get('utm_campaign')
            };
            var iti = inputArr[2];
            user.phone = iti.getNumber();
        
            let request = $.post(url, user);
            request.done(function(data){
                if(data == "OK") {window.location = '/welcomeuiux';}
                else{alert("OOPS, data is not be send to server. Please refresh this page and try again.");}
            })
        });
});



/*----------------------------scroll to id animation------------------------------------*/
$('a[href*="#"]').on('click', function (e) {
    e.preventDefault()
  
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top,
      },
      500,
      'linear'
    )
  });

  

  /*------------------ParseURL-----------------------------------*/

