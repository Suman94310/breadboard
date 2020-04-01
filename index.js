import Simulation from "./scripts/simulation.js"


window.onload = ()=>{
    let board = document.getElementById("board");
    let boardContainer = document.getElementById("board-container")
    board.width = boardContainer.offsetWidth
    board.height = window.innerHeight-4//boardContainer.offsetHeight
    let context = board.getContext('2d');

    let simulation = new Simulation(context)

    simulation.start()
    simulation.draw()

    let lastTime = 0;
    const gameLoop = timestamp => {
        context.clearRect(0, 0, boardContainer.offsetWidth, boardContainer.offsetHeight);
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        simulation.update(context);

        //creating stupid grid
        context.strokeStyle='rgba(0,0,0,0.1)';      
        for(let i=0; i<board.width/20; i++){
            context.beginPath();
            context.moveTo(i*20, 0);
            context.lineTo(i*20, board.height);
            context.stroke();
        }
        for(let i=0; i<board.height/20; i++){
            context.beginPath();
            context.moveTo(0, i*20);
            context.lineTo(board.width, i*20);
            context.stroke();
        }
        context.strokeStyle='rgba(0,0,0)'; 

        requestAnimationFrame(gameLoop);
    };
    gameLoop(0)
}