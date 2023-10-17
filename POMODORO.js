let Element_button_start = document.querySelector('.button_start');
let Element_par = document.querySelector('.time');

let Element_button_reset = document.querySelector('.button_reset');

let Element_par_whatTime = document.querySelector('.what_time');

let timeID;
let whatTimeID;

let sec;
let min;

let sec_reset;
let min_reset;

let blink = 1;

let timeREST_display = 0;

let timeClick = 0;

Element_button_start.addEventListener('click', () => {
    if (timeClick === 0) {
        start();
        timeClick = 1;
    }
    
});

Element_button_reset.addEventListener('click', () => {
    stop();
    Element_par_whatTime.innerText = 'Focus Time';
    timeClick = 0;
});

// FUNCTION AREA

function start() {
    // TIME FORCUS
    sec = 59;
    min = 24;

    // REST TIME
    sec_reset = 59;
    min_reset = 4;

    timeID = setInterval(function() {

        // FOCUS TIME
        if (min >= 0) {
            Element_par_whatTime.classList.remove('what_time_workEnd');
            Element_par_whatTime.innerText = 'Focus Time';

            if (sec >= 0) {
                display_focus(min, sec);
                sec--;
            }
    
            if (sec < -1) {
                
                min--;
                sec = 59; // Convert to rest time by minus 1
                if (min >= 0) {
                    display_focus(min, sec);
                }
                sec--;
            }

            if (sec === -1 ) {
                sec--;
            }
            
            if (min < 0) {
                whatTimeID = setInterval(function() {
                    Element_par_whatTime.innerText = 'Phase work end';
                    console.log(`blink: ${blink}`);
                    if (blink === 0) {
                        Element_par_whatTime.classList.add('what_time_workEnd');
                        blink = 1;
                    }
                    else {
                        Element_par_whatTime.classList.remove('what_time_workEnd');
                        blink = 0;
                    }
                    sec--;

                    if (sec === 50) {
                        clearInterval(whatTimeID);
                        timeREST_display = 1;
                    }

                    
                    console.log(`min time up: ${min}`);
                    console.log(`sec time up: ${sec}`);
                    
                }, 500)
            }
            

            console.log(`min: ${min}`);
            console.log(`sec: ${sec}`);
        }

        // REST TIME
        else if (min < 0 && min_reset >= 0 && sec === 50 && timeREST_display === 0) {

            if (min_reset >= 0) {
                if (sec_reset >= 0) {
                    display_focus(min_reset, sec_reset);
                    sec_reset--;
                }

                if (sec_reset < 0) {
                    min_reset--;
                    sec_reset = 59;
                    if (min_reset >= 0) {
                        display_focus(min_reset, sec_reset);
                    }
                    sec_reset--;
                }

                if (sec_reset === -2 ) {
                    sec_reset--;
                }

                if (min_reset < 0) {
                    whatTimeID = setInterval(function() {
                        Element_par_whatTime.innerText = 'Phase rest end';
                        console.log(`blink: ${blink}`);
                        if (blink === 0) {
                            Element_par_whatTime.classList.add('what_time_workEnd');
                            blink = 1;
                        }
                        else {
                            Element_par_whatTime.classList.remove('what_time_workEnd');
                            blink = 0;
                        }
                        sec_reset--;
    
                        if (sec_reset === 50) {
                            clearInterval(whatTimeID);
                        }
    
                        
                        console.log(`min reset time up: ${min_reset}`);
                        console.log(`sec reset time up: ${sec_reset}`);
                        
                    }, 500)
                }
            }

            console.log(`min reset: ${min_reset}`);
            console.log(`sec reset: ${sec_reset}`);
        }
        else if (min_reset <= 0 && sec_reset === 50) {
            // TIME FORCUS
            sec = 59;
            min = 24;

            // REST TIME
            sec_reset = 59;
            min_reset = 24;

            timeREST_display = 1;
        }

        // DISPLAY REST TIME
        if (timeREST_display === 1) {
            Element_par.innerHTML = '05:00';
            timeREST_display = 0;

            Element_par_whatTime.classList.remove('what_time_workEnd');
            Element_par_whatTime.innerText = 'Rest Time';
        }
        
    }, 10);    
}

function stop() {
    clearInterval(timeID);
    clearInterval(whatTimeID);
    Element_par.innerHTML = `25:00`;
}

function display_focus(display_min, display_sec) {
    if (display_min < 10 && display_sec < 10) {
        Element_par.innerHTML = `0${display_min}:0${display_sec}`;
    }
    else if (min >= 10 && sec >= 10) {
        Element_par.innerHTML = `${display_min}:${display_sec}`;
    }
    else if (min >= 10 && sec < 10) {
        Element_par.innerHTML = `${display_min}:0${display_sec}`;
    }
    else {
        Element_par.innerHTML = `0${display_min}:${display_sec}`;
    }
}