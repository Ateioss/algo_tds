let survivorsFirstname = ["Mathis", "Lynda", "Sixtine", "Ryan", "Felix", "Ethan", "Sara", "Mehdi", "Thibaut", "Guillaume", "Hoai_Lan", "Celine", "Pierre_Louis", "Lucie", "Bastien"];
let survivorsLastname = ["Blond","ginger", "brown", "bastard", "strongman", "fat", "geek", "communist", "vsco girl", "fratguy"];
let survivorProbalities = [
    ["0.3","0.5","0.2"],
    ["0.3","0.6","0.1"],
    ["0.4","0.6","0.0"],
    ["0.2","0.3","0.5"],
    ["0.1","0.2","0.7"]
];


class Killer {
    constructor(name,lifepoint){
        this.name= name;
        this.lifepoint= lifepoint;
    }

    setDmg(dmg){
        this.lifepoint= this.lifepoint - dmg;
        console.log("Domage : " + dmg + " lifepoints : " + this.lifepoint);
    }

    atk(survivorNumber){
        let survivorNumberRandom = Math.floor(Math.random() * survivorNumber);
        return survivorNumberRandom;
    }

    isLive(){
        if(this.lifepoint>0){
            return true; // le killer est en vie
        } else {
            return false; // le killer est mort
        }
    }
}

class Survivor{
    constructor (firstname, lastname /*, dmgProb, dmgDuringDyingProb, deathProb*/){
        this.firstname= firstname;
        this.lastname= lastname;
        /*this.dmgProb= dmgProb;
        this.dmgDuringDyingProb=dmgDuringDyingProb;
        this.deathProb=deathProb;*/
        this.death=false;
    }
    
    actionsOnAttack(){
        //generer un nombre alétoire pour savoir la l'action que le survivant fera en réaction de celle du tueur
        let action = Math.floor(Math.random() * 3);
        
        if (action == 0) {
            this.death = true;
            console.log("mort de : " + this.firstname + " " + this.lastname);
            return 0; // aucun domage à appliquer au killer
        }
        else if (action == 1) {//the survivor dies and does 15 dmg to the killer and dodge his atk
            this.death = true;
            console.log("mort de : " + this.firstname + " " + this.lastname);
            return 15; // valeur du domage à appliquer au killer
        } 
        else if (action == 2) {//the survivor do 10 dmg to the killer and dodge his atk
            return 10;// valeur du domage à appliquer au killer 
        }
    }    
}


//création du killer 
let g_killer = new Killer("Jason", 100);

//création des 5 survivors
const g_numberSuvivors = 5;
let g_survivors = [];

let randomFirstnameNumber = -1;
let randomFirstname = "";
let randomLastnameNumber = -1;
let randomLastname = "";
let probAletoireNumber = -1;
let probAletoire = null;

for (let numberSurvivors = 0; numberSurvivors < g_numberSuvivors; numberSurvivors++) {
    // name aléatoire générated
    randomFirstnameNumber = Math.floor(Math.random() * survivorsFirstname.length);
    randomFirstname = survivorsFirstname[randomFirstnameNumber];

    randomLastnameNumber = Math.floor(Math.random() * survivorsLastname.length);
    randomLastname = survivorsLastname[randomLastnameNumber];

    // probabilities aléatoire générated
    probAletoireNumber = Math.floor(Math.random() * survivorProbalities.length);
    probAletoire = survivorProbalities[probAletoireNumber];
    
    // créate survivor
    g_survivors [numberSurvivors] = new Survivor(randomFirstname, randomLastname); //probAletoire[0], probAletoire[1], probAletoire[2]);
}

//lance le jeu 
let g_nbrSurvivorsAlive = g_numberSuvivors;
let randomSurvivor = -1; 
let survivorAttaqued = null;
let domageApplyToKiller = 0;

while ((g_killer.isLive() == true) && (g_nbrSurvivorsAlive >0)) {

    console.log("g_nbrSurvivorsAlive : " + g_nbrSurvivorsAlive);

    randomSurvivor = g_killer.atk(g_nbrSurvivorsAlive);

    console.log("randomSurvivor : " + randomSurvivor);

    survivorAttaqued = g_survivors [randomSurvivor];

    console.log(survivorAttaqued);
    
    domageApplyToKiller = survivorAttaqued.actionsOnAttack();

    g_killer.setDmg (domageApplyToKiller);

    if (survivorAttaqued.death == true) {
        g_nbrSurvivorsAlive = g_nbrSurvivorsAlive - 1;
        // delete le survivor in the list of the survivors
        g_survivors.splice(randomSurvivor, 1);
    }
}
// fin du jeu et compte rendu
console.log("End of Game !")
if(g_killer.isLive() == false){
    console.log("The killer have been killed !");
}else {
    console.log("The killer have won !");
}