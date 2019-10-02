var palabraSecreta = "";
var palabra = [];
var intentos = 6;
var usedWords = document.getElementById("usedWord");
var input = document.getElementById("input");
input.disabled = true;
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});


askForWord()
convertirGuiones();

function askForWord() {
    while (true) {
        palabraSecreta = Array.from(prompt("Introduzca una palabra: ").toUpperCase());
        if (palabraSecreta.length > 0) {
            input.disabled = false;
            break;
        }
    }
}

function convertirGuiones() {
    for (var i = 0; i <= palabraSecreta.length - 1; i++) {
        palabra.push("_");
    }

    document.getElementById("palabra").innerHTML = palabra.join(" ");
}

function checkLetter() {
    var letra = document.getElementById("input").value;
    if (letra.length != 1) {
        alert("Debes introducir una sola letra");
    } else {
        letra = letra.toUpperCase();

        if (usedWords.textContent.substring(16, usedWords.textContent.length).includes(letra)) {
            document.getElementById("input").value = "";
            alert("Ya has introducido esa letra");
        } else {
            if (palabraSecreta.includes(letra.toUpperCase())) {
                for (var i = 0; i <= palabraSecreta.length; i++) {
                    if (palabraSecreta[i] == letra) {
                        palabra[i] = letra;
                    }
                }
                document.getElementById("palabra").innerHTML = palabra.join(" ");
            } else {
                intentos--;
            }
            document.getElementById("image").src = "../images/" + intentos + ".png";
            document.getElementById("usedWord").innerHTML += letra + "&nbsp;";
            document.getElementById("input").value = "";
            window.setTimeout(checkEndGame, 100);
        }
    }
}

function checkEndGame() {
    if (palabraSecreta.join("") == palabra.join("") && intentos != 0) {
        var result = confirm("Has ganado!! ¿Quiéres jugar de nuevo?");
        if (result) {
            location.reload();
        }
    } else if (intentos <= 0) {
        var result = confirm("Has perdido! ¿Quiéres jugar de nuevo?");
        if (result) {
            location.reload();
        }
    }
}