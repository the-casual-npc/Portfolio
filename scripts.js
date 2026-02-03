let typeSpeed = 50;

document.addEventListener("click", async () => {
    let screenElement = document.getElementById("nameH1");
    let devText = "☣<h1>Ondřej⚡<br>Puk</h1>";

    await JSwriteAnim(devText, screenElement);

    screenElement = document.getElementById("nameH1");
    
    devText = `☣
    .name {☣
        font-size: 10vh;☣
        font-weight: bold;☣
    }⚡
    `;
    await CSSwriteAnim(devText, screenElement);

});

async function JSwriteAnim(devText, screenElement) {
    console.log("Starting JS write animation");
    
    screenWrite = true;

    let lastCommand = "";
    const p = await new Promise((resolve) => {
        for (let scriptTextIndex = 0; scriptTextIndex <= devText.length; scriptTextIndex++) {

            setTimeout(() => {

                let devElement = document.getElementById("jsLine");

                //DevText write
                switch (devText.charAt(scriptTextIndex)) {
                    case "☣":
                        devTextNewLine(true);
                        break;

                    case "⚡":
                        break;

                    default:
                        devElement.innerHTML = devElement.innerHTML + devText.charAt(scriptTextIndex);
                        break;
                }

                //Screen write
                switch (devText.charAt(scriptTextIndex)) {
                    case "<":
                        screenWrite = false;
                        lastCommand = "<";
                        break;

                    case "☣":
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

                    case "⚡":
                        resolve();
                        break;
                }

            }, scriptTextIndex * typeSpeed);
        }
    });
}

async function CSSwriteAnim(devText, screenElement) {
    console.log("Starting CSS write animation");

    let lastCommand = "";
    const p = await new Promise((resolve) => {
        for (let scriptTextIndex = 0; scriptTextIndex <= devText.length; scriptTextIndex++) {

            setTimeout(() => {

                let devElement = document.getElementById("cssLine");

                //DevText write
                switch (devText.charAt(scriptTextIndex)) {
                    case "☣":
                        devTextNewLine(false);
                        break;

                    case "⚡":
                        break;

                    default:
                        devElement.innerHTML = devElement.innerHTML + devText.charAt(scriptTextIndex);
                        break;
                }

                //Screen write
                switch (devText.charAt(scriptTextIndex)) {
                    case "{":
                        lastCommand = "";
                        break;

                    case "☣":
                        break;

                    default:
                        lastCommand = lastCommand + devText.charAt(scriptTextIndex);
                        break;

                    case ";":
                        lastCommand = lastCommand + ";";
                        console.log("Last command:", lastCommand);

                        screenElement.style.cssText = screenElement.style.cssText + " " + lastCommand;

                        lastCommand = "";
                        break;

                    case "⚡":
                        resolve();
                        break;
                }

            }, scriptTextIndex * typeSpeed);
        }
    });
}

//New line in dev text
function devTextNewLine(script) {
    let oldLine;
    const newLine = document.createElement("p");

    if (script) {
        console.log("New script line");

        oldLine = document.getElementById("jsLine");
        document.getElementById("scriptText").appendChild(newLine);

        oldLine.id = "";
        newLine.id = "jsLine";
    } else {
        console.log("New CSS line");

        oldLine = document.getElementById("cssLine");
        document.getElementById("styleText").appendChild(newLine);

        oldLine.id = "";
        newLine.id = "cssLine";
    }

}