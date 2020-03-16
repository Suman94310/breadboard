export default class Led{
    constructor(simulation, position){
        this.position = position;
        this.value = 1;
        this.simulation = simulation;
        this.selected = 0;
        this.input = null;
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x -14 &&
            position.x <= this.position.x + 30 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 30)
            {
                this.select(this.simulation.context)
                if(position.x < this.position.x -8){
                    return {position:"node", 
                            x: position.x - this.position.x,
                            y: position.y - this.position.y};
                }
                else return {position:"object", 
                x: position.x - this.position.x,
                y: position.y - this.position.y};
            }
        else{
            this.unSelect()
            return 0;
        }
    }

    move = (mousePosition)=>{
        this.position.x = mousePosition.x
        this.position.y = mousePosition.y
    }

    select = ()=>{
        this.selected = 1
    }

    unSelect = ()=>{
        this.selected = 0
    }

    draw = ()=>{
        if(this.selected){
            this.simulation.context.strokeStyle = "red"
        }
        this.simulation.context.beginPath();
        this.simulation.context.rect(this.position.x, this.position.y, 30, 30)
        this.simulation.context.stroke();

        this.simulation.context.beginPath();
        if(this.input !== null){
            if(this.input.value == 1){
                this.simulation.context.fillStyle = "yellow"
            }
            else{
                this.simulation.context.fillStyle = "black"
            }
        }
        this.simulation.context.arc(this.position.x +15, this.position.y + 15, 7, 0, 2 * Math.PI);
        this.simulation.context.stroke();
        this.simulation.context.fill();
        this.simulation.context.fillStyle = "black"
        
        this.simulation.context.beginPath();
        this.simulation.context.moveTo(this.position.x, this.position.y + 15);
        this.simulation.context.lineTo(this.position.x - 12, this.position.y +15);
        this.simulation.context.stroke();

        this.simulation.context.beginPath();
        this.simulation.context.arc(this.position.x - 12 - 2, this.position.y +15, 2, 0, 2 * Math.PI);
        this.simulation.context.stroke();
        this.simulation.context.strokeStyle = "#000"
    }

    update = ()=>{
        this.draw()
    }
}