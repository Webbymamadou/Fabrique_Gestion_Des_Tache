let taches = [];

document.getElementById("btnAjouter").addEventListener("click", function(e){
    e.preventDefault();
    ajouterTache();
});

function ajouterTache(){

    let titre = document.getElementById("titre").value;
    let description = document.getElementById("descript").value;
    let date_limite = document.getElementById("date_limite").value;
    let statut = document.getElementById("statut").value;
    let priorite = document.getElementById("priorite").value;

    if(titre === "" || description === "" || date_limite === "" || statut === ""){
        alert("Remplis tous les champs svp !!");
        return;
    }

    let tache = {
        id: Date.now(),
        titre: titre,
        description: description,
        date_limite: date_limite,
        statut: statut,
        priorite: priorite,
        terminee: false
    };

    taches.push(tache);

    viderFormulaire();
    afficherTaches();
}

function afficherTaches(){

    let liste = document.getElementById("liste");
    liste.innerHTML = "";

    taches.forEach(tache => {

        let div = document.createElement("div");
        div.className = "tache";

        if(tache.terminee){
            div.style.textDecoration = "line-through";
            div.style.opacity = "0.6";
        }

        div.innerHTML = `
            <h4>${tache.titre}</h4>
            <p>${tache.description}</p>
            <span>Date : ${tache.date_limite}</span><br>
            <span class="priorite">${tache.priorite}</span><br>

            <button onclick="terminerTache(${tache.id})">Terminer</button>
            <button onclick="modifierTache(${tache.id})">Modifier</button>
        `;

        liste.appendChild(div);
    });
}

function terminerTache(id){

    let tache = taches.find(t => t.id === id);

    if(tache){
        tache.terminee = true;
        afficherTaches();
    }
}


function modifierTache(id){

    let tache = taches.find(t => t.id === id);

    document.getElementById("titre").value = tache.titre;
    document.getElementById("descript").value = tache.description;
    document.getElementById("date_limite").value = tache.date_limite;
    document.getElementById("statut").value = tache.statut;
    document.getElementById("priorite").value = tache.priorite;

    taches = taches.filter(t => t.id !== id);
    afficherTaches();
}

function viderFormulaire(){

    document.getElementById("titre").value = "";
    document.getElementById("descript").value = "";
    document.getElementById("date_limite").value = "";
    document.getElementById("statut").value = "";
    document.getElementById("priorite").value = "";
}