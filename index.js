import Simulation from "./scripts/simulation.js"


window.onload = ()=>{
    let board = document.getElementById("board");
    let context = board.getContext('2d');

    let simulation = new Simulation(context)

    simulation.start()
    simulation.draw()

    let lastTime = 0;
    const gameLoop = timestamp => {
        context.clearRect(0, 0, 735, 595);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        simulation.update(context);
        requestAnimationFrame(gameLoop);
    };
    gameLoop(0)
}