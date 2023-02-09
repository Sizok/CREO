let intervalStorage = {};



function startScroll(){
    let rowArrow = document.querySelectorAll('#scroll');
    if(rowArrow){
        for(elem of rowArrow){
            setScroll(elem);
        }
    }
};


function setScroll(scrollingElem){
    if(scrollingElem.dataset.direction == 'left'){
        if(scrollingElem.dataset.id in intervalStorage) return;
        scrollingElem.scrollLeft = scrollingElem.scrollWidth;
        let intervalVar = setInterval(()=>{
            scrollingElem.scrollLeft -= 1
            if(scrollingElem.scrollLeft == 0){
                scrollingElem.scrollLeft = scrollingElem.scrollWidth;
            }
        }, 31);
        intervalStorage[scrollingElem.dataset.id] = intervalVar;
    }else{
        if(scrollingElem.dataset.id in intervalStorage) return;
        let intervalVar = setInterval(()=>{
            scrollingElem.scrollLeft += 1
            if(scrollingElem.scrollLeft == scrollingElem.scrollWidth - scrollingElem.clientWidth){
                scrollingElem.scrollLeft = 0;
            }
        }, 31);
        intervalStorage[scrollingElem.dataset.id] = intervalVar;
    }
}

document.addEventListener('scroll', function(){
    if(window.scrollY > 5400){
        startScroll();
    }
})

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



  document.addEventListener('DOMContentLoaded', function(){
    let modalBtn = document.querySelectorAll('#openModalBtn');
    let closeBtn = document.querySelectorAll('#closeModalBtn');
    let modalWindow = document.querySelectorAll('.modal-window');
    let id;
// не відкриває бо є дваелементи із одинаковим ID
    for(let elem of modalBtn){
        elem.addEventListener('click',function(e) {
            e.preventDefault();
            id = e.target.dataset.id;
            for(elem of modalWindow){
                if(elem.dataset.id == id){
                    elem.style.display = 'block';
                }
            }
        });
    }
    
    for (let elem of closeBtn){
        elem.addEventListener('click',function(e) {
            e.preventDefault();
            modalWindow[id-1].style.display = 'none';
        })
    }
    
    window.onclick = function(e){
        if (e.target == modalWindow[id-1]) {
            modalWindow[id-1].style.display = 'none';
        }
    }
});






