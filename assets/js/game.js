// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function(){
var name = "";
while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
}
console.log("Your robot's name is " + name);
return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -+7;
        }
        else {
            window.alert("you don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack +=6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

//you can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo trumble",
        attack: randomNumber(10,14)
    }
];


var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0){
        //ask player if they'd like to fight or run
        var promptFight = window.prompt("would you like to FIGHT or SKIP battle?  Enter 'FIGHT' or 'SKIP' to choose");
        console.log(promptFight);

        //if player picks 'skip confirm and hen stop the loop
        if(promptFight === "skip" || promptFight === "SKIP"){
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if(confirmSkip){
                window.alert(playerInfo.name + " has decided to skip this fight.  Goodbuy!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            } 
        }
    
        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " +enemy.name + " now has " + enemy.health + " health remaining.");
    
        //check enemy's health
        if(enemy.health<=0) {
            window.alert(enemy.name + " has died!");
            
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            
            //leave while() loop since enemy is dead
            break;
        }   else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            }
            
    
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
    
         // Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
    
            //check player's health
            if(playerInfo.health <=0) {
                window.alert(playerInfo.name + " has died!");
                //leave while() loop if player is dead
                break;
            }   else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            } 
    }  
};
//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++){
        if(playerInfo.health > 0) {
            //let player know what round they are in, remember that arrays start at 0 so it needs to have a 1 added to it
            window.alert ("welcome to Robot Gladiators! Round " + (i+1));

            //pick new enemy to fight based on the inde of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40,60);
            //use debugger to pause script for running and check whats going on
            //debugger;
            //call fight function with enemy robot
        fight(pickedEnemyObj);
        //if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1){
            //ask if player wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            //if yes, take them to the store() function
            if(storeConfirm) {
                shop();
            }
        }
        }  
        else {
            window.alert("You have lsot your robot in battle! Game Over!");
            break;
        } 
    }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
   
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //if player is still alive, player wins!
    if (playerInfo.health>0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
//ask the player if they's like to play again
    var playAgainConfirm = window.confirm ("would you like to play agian?");
    if (playAgainConfirm){
        //restart the game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
    }
    
};

var shop = function() {
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the STORE?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    //Use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shopt() again to force player to pick a valid option
            shop();
            break;
    }
};




//start the game when the page loads
startGame();

