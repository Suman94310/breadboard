export default class Led{
    constructor(simulation, position){
        this.position = position;
        this.value = 0;
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
        let and = document.getElementById("and")
        this.simulation.context.drawImage(and, this.position.x, this.position.y, 95, 80);
    }

    update = ()=>{
        this.draw()
    }
}