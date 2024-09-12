let juego__empezado = false
let pajaro__caida = 0
let subiendo = false
let perdiste = false
let pajaro__altura = 0
let frenar;
let victoria = false

let grupoTotal = document.querySelectorAll(".flappy__grupoTuberias");
let grupoTuberiasSuperior = document.querySelectorAll(".flappy__tuberiaSuperior");
let grupoTuberiasInferior = document.querySelectorAll(".flappy__tuberiaInferior");


function pantalla() {
    let pantalla__bordes = {
        pantalla__ancho: window.innerWidth,
        pantalla__alto: window.innerHeight
    }
    return pantalla__bordes
}

function empezar__juego() {
    document.addEventListener("keydown", e => {
        if ((e.key === "w" || e.key === " " || e.key === "Spacebar") && juego__empezado == false) {
            iniciarJuego();
        }
    });

    document.addEventListener("click", e => {
        if (juego__empezado == false) {
            iniciarJuego();
        }
    });

    document.addEventListener("touchstart", e => {
        if (juego__empezado == false) {
            iniciarJuego();
        }
    });

    function iniciarJuego() {
        juego__empezado = true;
        borde__tuberia(pajaro__cayendo(pantalla()));
        tuberia__movimiento();
        finalizado();
    }

    return juego__empezado
}

function pajaro__cayendo(pantalla__bordes) {
    pajaro__elevar()
    caida = setInterval(() => {
        pajaro__altura = flappy__pajaro.getBoundingClientRect();

        if (pajaro__altura.y <= pantalla__bordes.pantalla__alto - pajaro__altura.height && pajaro__altura.y >= 0) {
            if (subiendo) {
                pajaro__caida -= 4;
            } else {
                pajaro__caida += 4;
            }
            flappy__pajaro.style.top = pajaro__caida + "px";
        } else {
            clearInterval(caida)
            perdiste = true
        }
    }, 50);
}
empezar__juego()

function pajaro__elevar() {
    const elevar = document.addEventListener("keydown", e => {
        if (e.key === "w" || e.key === " ") {
            if (frenar) {
                clearTimeout(frenar);
            }
            subiendo = true;
            frenar = setTimeout(() => {
                subiendo = false;
            }, 400);
        }
    });
    const elevar__click = document.addEventListener("click", e => {
        if (frenar) {
            clearTimeout(frenar);
        }
        subiendo = true;
        frenar = setTimeout(() => {
            subiendo = false;
        }, 400);
    })
}

function tuberia__movimiento() {
    let flappy__tuberiasPosicion = 0
    movimiento = setInterval(() => {
        flappy__tuberiasPosicion -= 2
        flappy__tuberias.style.left = flappy__tuberiasPosicion + "px"
    }, 50);
}

function borde__tuberia() {
    posicion = setInterval(() => {
        grupoTuberiasSuperior.forEach(tuberia => {
            let tuberia__bordesSuperior = tuberia.getBoundingClientRect();
            if (pajaro__altura.right > tuberia__bordesSuperior.left && pajaro__altura.top < tuberia__bordesSuperior.bottom && pajaro__altura.left < tuberia__bordesSuperior.right) {
                perdiste = true;
            }
        });

        grupoTuberiasInferior.forEach(tuberia => {
            let tuberia__bordesInferior = tuberia.getBoundingClientRect();
            if (pajaro__altura.right > tuberia__bordesInferior.left && pajaro__altura.bottom > tuberia__bordesInferior.top && pajaro__altura.left < tuberia__bordesInferior.right) {
                perdiste = true;
            }
        });

    }, 100);
}

function finalizado() {
    clear = setInterval(() => {
        if (juego__empezado && perdiste || victoria === true) {
            alert("perdiste")
            clearInterval(posicion);
            clearInterval(caida);
            clearInterval(movimiento);
            clearTimeout(frenar);
            clearInterval(clear);
        }
        if (victoria === true) {
            grupoTotal.forEach(grupo => {
                grupo.style.display = "none"
            });
            flappy.classList.add("prueba")
            flappy__cajaFinal.classList.add("prueba2")
            flappy.style.animation = "opacidad 2s"
            setTimeout(() => {
                flappy__pajaro.style.animation = "flappy 5s linear"
            }, 1000);
            setTimeout(() => {
                flappy__pajaro.style.display = "none"
            }, 6000);
            flappy__pajaro.style.top = "0"
        }
    }, 200);
}

function prevenirZoom() {
    document.addEventListener('wheel', function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
        }
        if (e.ctrlKey && (e.key === '-' || e.key === '_' || e.key === '-')) {
            e.preventDefault();
        }
        if (e.ctrlKey && e.key === '0') {
            e.preventDefault();
        }
    });

}


function hitbox(params) {
    let verHitbox = true
    hitbox = document.getElementById("hitbox");
    hitbox.addEventListener("click", e => {
        if (verHitbox) {
            flappy__pajaro.style.backgroundColor = "red"; 
            verHitbox = false
        } else {
            flappy__pajaro.style.backgroundColor = "rgba(255, 0, 0, 0)"; 
            verHitbox = true
        }
    });
    
}
hitbox()
prevenirZoom()