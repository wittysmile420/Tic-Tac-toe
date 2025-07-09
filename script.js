let buttons = document.querySelectorAll(".outer_box button");

let click_ct = new Array(buttons.length);
for(let i = 0 ; i < buttons.length ;  i++){
    click_ct[i] = 0;
}

let current_click_ct = 0;
let choice = new Array(buttons.length);

function choice_validate(cell1, cell2, cell3){
    if(cell1 == 'X' && cell2 == 'X' && cell3 == 'X') return [true, 'X'];
    if(cell1 == 'O' && cell2 == 'O' && cell3 == 'O' ) return [true, 'O'];
    return [false, -1];
}
function did_won(){
    // row wins
    if(choice_validate(choice[0], choice[1], choice[2])[0] == true){
        return choice_validate(choice[0], choice[1], choice[2]);
    }
    if(choice_validate(choice[3], choice[4], choice[5])[0] == true){
        return choice_validate(choice[3], choice[4], choice[5]);
    }
    if(choice_validate(choice[6], choice[7], choice[8])[0] == true){
        return choice_validate(choice[6], choice[7], choice[8]);
    }
    
    // now column wins
    if(choice_validate(choice[0], choice[3], choice[6])[0] == true){
        return choice_validate(choice[0], choice[3], choice[6]);
    }
    if(choice_validate(choice[1], choice[4], choice[7])[0] == true){
        return choice_validate(choice[1], choice[4], choice[7]);
    }
    if(choice_validate(choice[2], choice[5], choice[8])[0] == true){
        return choice_validate(choice[2], choice[5], choice[8]);
    }

    // now diagonal wins
    if(choice_validate(choice[0], choice[4], choice[8])[0] == true){
        return choice_validate(choice[0], choice[4], choice[8]);
    }
    if(choice_validate(choice[2], choice[4], choice[6])[0] == true){
        return choice_validate(choice[2], choice[4], choice[6]);
    }

    return false;
}

let game_won = false;
for(let i = 0 ; i < buttons.length ; i++){
    buttons[i].addEventListener("click", 
        function(){
            if(game_won == true){
                alert("Please refresh to start new game");
                return;
            }
            // so anyone didn't won hence clicl shall be allowe
            if(click_ct[i] == 1){
                alert("any button can't be clicked twice");
                return;
            }
            click_ct[i] += 1;
            current_click_ct += 1;
            console.log("button [" + i + "] clicked " + click_ct[i] + " times")

            if(current_click_ct % 2 == 1){
                choice[i] = 'X' ;
            }
            else{
                choice[i] = 'O' ;
            }
            console.log("choice [" + i + "] is " + choice[i] )
            buttons[i].innerHTML = choice[i];

            // did won after execution of current click?
            let result = did_won();
            if(result[0] == true){
                alert(result[1] + " won");
                game_won = true;
                return;
            }
        }
    );
}