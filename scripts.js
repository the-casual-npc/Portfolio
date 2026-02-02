console.log("Script loaded");

document.addEventListener("click", async () => {
    let devElement = document.getElementById("devLine");
    let screenElement = document.getElementById("nameH1");
    let devText = "<h1>Ondřej<br>Puk</h1>";

    await JSwriteAnim(devText, devElement, screenElement);

    devElement = document.getElementById("devLine2");
    screenElement = document.getElementById("nameH1");
    devText = "name {font-size: 0.3vh;}";

    await CSSwriteAnim(devText, devElement, screenElement);
});

async function JSwriteAnim(devText, devElement, screenElement) {
    console.log("Starting write animation");
    
    screenWrite = true;

    let lastCommand = "";
    for (let scriptTextIndex = 0; scriptTextIndex <= devText.length; scriptTextIndex++) {
        setTimeout(() => {
            devElement.textContent = devText.slice(0, scriptTextIndex);

            switch (devText.charAt(scriptTextIndex)) {
                case "<":
                    screenWrite = false;
                    lastCommand = "<";
                    break;

                default:
                    if (screenWrite) {
                        screenElement.innerHTML = screenElement.innerHTML + devText.charAt(scriptTextIndex);
                    } else {
                        lastCommand = lastCommand + devText.charAt(scriptTextIndex);
                    }
                    break;

                case ">":
                    screenWrite = true;
                    lastCommand = lastCommand + ">";

                    console.log("Last command:", lastCommand);

                    switch (lastCommand) {
                        case "<br>":
                            screenElement.innerHTML = screenElement.innerHTML + "<br>";
                            break;
                    }

                    break;
            }

        }, scriptTextIndex * 100);
    }
}

async function CSSwriteAnim(){}