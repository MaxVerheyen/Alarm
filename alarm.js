window.addEventListener("load", function(){
    const maanden = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    const dagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

    function showTime(){
        let nu = new Date();
        let jaar = nu.getFullYear();
        let maandNr = nu.getMonth();
        let maand = maanden[maandNr];
        let datum = nu.getDate();
        let dagNr = nu.getDay();
        let dag = dagen[dagNr];
        let uren = nu.getHours();
        if (uren <= 9){
            uren = "0" + uren;
        };
        let minuten = nu.getMinutes();
        if (minuten <= 9){
            minuten = "0" + minuten;
        };
        let seconden = nu.getSeconds();
        if (seconden <= 9){
            seconden = "0" + seconden;
        };
        let datumWaarde = dag + " " + datum + " " + maand + " " + jaar + " " + uren + ":" + minuten + ":" + seconden;
        document.getElementById("klok").innerHTML = datumWaarde;
        setTimeout(showTime, 1000);
    };

    function showOptions(a,b){
        for(let i = 0; i < b; i++){
            let option = document.createElement("option");
            if(i <= 9){
                option.value = "0"+i;
                option.innerHTML = "0"+i;
            }else{
                option.value = i;
                option.innerHTML = i;
            };
            a.appendChild(option);
        };
    };
    showTime();
    showOptions(alarmUren,24);
    showOptions(alarmMinuten,60);
});

let video = document.getElementById("video");
let alarmUren = document.getElementById("uren");
let alarmMinuten = document.getElementById("minuten");
let timer;

video.addEventListener("focus",function(){
    localStorage.setItem("test",this.value);
    this.value = "";
});

video.addEventListener("focusout",function(){
    if(this.value == ""){
        this.value = localStorage.getItem("test");
    };
    localStorage.removeItem("test");
});

document.getElementById("alarm").addEventListener("click",function(){
    function alarm(){
        let nu = new Date();
        let uren = nu.getHours();
        if (uren <= 9){
            uren = "0" + uren;
        };
        let minuten = nu.getMinutes();
        if (minuten <= 9){
            minuten = "0" + minuten;
        };
        if(uren == alarmUren.value && minuten == alarmMinuten.value){
            //console.log('OPSTAAAAAAN!');
            window.location.href = video.value;
            return// Stop de alarm functie.
        };
        //console.log('Blijf slapen');
        timer = setTimeout(alarm, 1000);// Timer is globale var, omdat hij gecleared moet worden met reset functie.
    };
    video.setAttribute("disabled","");
    disableOptions(true);
    alarm();
});

document.getElementById("reset").addEventListener("click",function(){
    function reset(){
        alarmUren.value = "00";
        alarmMinuten.value = "00";
        clearInterval(timer);// Stop de alarm functie.
    };  
    video.value = "https://www.youtube.com/watch?v=iNpXCzaWW1s";// Voorlopig.
    video.removeAttribute("disabled");
    disableOptions(false);
    reset();
});

function disableOptions(e){
    let select = document.querySelectorAll("select");
    for(let i = 0; i < select.length; i++){
        select[i].disabled = e;
    };
};