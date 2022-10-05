let textAreaFrom = document.querySelector('.from');
let textAreaTO = document.querySelector('.to');
let selectElms = document.querySelectorAll('select');
let speakerIcons = document.querySelectorAll('.fa-headphones');
let clipboardIcons = document.querySelectorAll('.fa-clipboard');


let changeIcon = document.getElementById('change');

let btn = document.querySelector('button');

document.addEventListener('DOMContentLoaded',()=>{

    selectElms.forEach((select)=>{
        for (const key in countries) {
            let option = document.createElement('option');
            option.value = key;
            option.innerText = countries[key];
            if(key=='en-GB'&&select.parentElement.classList.contains('controls-from')){
                option.selected=true
            }else
            if(key=='ar-SA'&&select.parentElement.classList.contains('controls-to')){
                option.selected=true
            }
            select.appendChild(option)
        }
    })
        

})

btn.addEventListener('click',function (e){
    let translateFrom = textAreaFrom.value;
    
    if(translateFrom){
        fetch(`https://api.mymemory.translated.net/get?q=${translateFrom}&langpair=${selectElms[0].value}|${selectElms[1].value}`).then(res=>{
            res.json().then(data=>{
                textAreaTO.value = data?.responseData?.translatedText;
            })
        });
    }

})

changeIcon.addEventListener('click',()=>{
    let temp = textAreaFrom.value;
    textAreaFrom.value = textAreaTO.value;
    textAreaTO.value = temp;
    let tempSelect = selectElms[0].value;
    selectElms[0].value = selectElms[1].value;
    selectElms[1].value = tempSelect;
})


speakerIcons.forEach(speaker=>{
    speaker.addEventListener('click',()=>{
        if(!textAreaFrom.value){return}
        let utterance;
        if(speaker.parentElement.classList.contains('controls-from')){
            
            utterance = new SpeechSynthesisUtterance(textAreaFrom.value);
            utterance.lang = selectElms[0].value;

        }else{
            utterance = new SpeechSynthesisUtterance(textAreaTO.value);
            utterance.lang = selectElms[1].value;
        }
        speechSynthesis.speak(utterance);
    })
})

clipboardIcons.forEach(cllipboard=>{
    cllipboard.addEventListener('click',()=>{
        
        if(cllipboard.parentElement.classList.contains('controls-from')){
            if(textAreaFrom.value)
            navigator.clipboard.writeText((textAreaFrom.value));

        }else{
            if(textAreaTO.value)
            navigator.clipboard.writeText((textAreaTO.value));
        }

    })
})
