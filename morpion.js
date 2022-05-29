//* On charge les informations utiles
//*Constante qui contient les differents statut du jeu dans le h2 de la page
const statut = document.querySelector("h2");
//* Constante qui contient les differents etat du jeu
let jeuActif = true;
//* Constante qui initialise le joueur sur le X
let joueurActif = "❌";
//* Constante qui initialise l'état du jeu
let etatJeu = ["", "", "", "", "", "", "", "", ""];

//*Constante qui contient les conditions de victoire
const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//* On crée la fonction qui permet de changer le statut du jeu
const gagne = () => `Le joueur avec les ${joueurActif} a gagné !`;
const egalite = () => `Egalité !`;
const tourJoueur = () => `C'est au tour du joueur qui joue avec les ${joueurActif}`;

//* On affiche quel joueur commence
statut.innerHTML = tourJoueur();

//* On ajoute les écouteurs d'événements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
document.querySelector("#recommencer").addEventListener("click", recommencer);


/**
 * 
 * Cette fonction permet de gérer le clic sur une case
 */
function gestionClicCase() {
  //* On récupère l'index de la case cliquée
  const indexCase = parseInt(this.dataset.index);

  //* On vérifie si la case est deja remplie ou si le jeu est fini
  if (etatJeu[indexCase] !== "" || !jeuActif) {
    return;
  }

  //* On met le symbole du joueur dans le tableau etatJeu et la case
  etatJeu[indexCase] = joueurActif;
  this.innerHTML = joueurActif;

  //* On vérifie si le joueur a gagné
  verifGagne();
}


/**
 * Cette fonction vérifie si le joueur a gagné
 */
function verifGagne() {
  let tourGagnant = false;

  //* On parcours toutes les conditions de victoire
  for (let conditionVictoire of conditionsVictoire) {
    let val1 = etatJeu[conditionVictoire[0]];
    let val2 = etatJeu[conditionVictoire[1]];
    let val3 = etatJeu[conditionVictoire[2]];

    //* Si l'une des cases est vide, on passe à la condition suivante
    if (val1 == "" || val2 == "" || val3 == "") {
      continue;
    }

    //* Si les trois cases sont identiques, on a gagné
    if (val1 == val2 && val2 == val3) {
      tourGagnant = true;
      break;
    }
  }

  //* Si le joueur a gagné, on affiche le statut
  if (tourGagnant) {
    statut.innerHTML = gagne();
    jeuActif = false;
    return;
  }

  //* Si toutes les cases sont remplies il y a égalité
  if (!etatJeu.includes("")) {
    statut.innerHTML = egalite();
    jeuActif = false;
    return;
  }

  //* On change de joueur 
  joueurActif = joueurActif == "❌" ? "⭕️" : "❌";
  statut.innerHTML = tourJoueur();
}


/**
 ** Cette fonction réinitialise le jeu
 */ 
function recommencer() {
  //* On réinitialise les cases
  etatJeu = ["", "", "", "", "", "", "", "", ""];
  //* On réinitialise le statut
  jeuActif = true;
  //* On réinitialise le joueur sur le X
  joueurActif = "❌";
  //* On réinitialise le statut du tour
  statut.innerHTML = tourJoueur();
  //* Efface toutes les cases
  document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}