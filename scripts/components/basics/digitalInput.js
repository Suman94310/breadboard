export default class digitalInput{
    constructor(simulation, position){
        this.position = position;
        this.simulation = simulation;
        this.selected = 0;
        this.nodeOffsets = [{x:0, y:20}]
        this.value = 0;
        this.inputNodes = [undefined]
        this.inputIds = [undefined]
        this.outputNodeStart = 1
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x &&
            position.x <= this.position.x + 49 +9 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 40 )
            {
                this.selected = 1
                if(position.x < this.position.x +7+ 3){
                    return {position:"node",
                            nodeId:1, 
                            x: position.x - this.position.x,
                            y: position.y - this.position.y};
                }
                else return {position:"object", 
                x: position.x - this.position.x,
                y: position.y - this.position.y};
            }
        else{
            this.selected = 0
            return 0;
        }
    }

    move = (mousePosition)=>{
        this.position.x = mousePosition.x
        this.position.y = mousePosition.y
    }


    draw = ()=>{
        if(this.selected){
            this.simulation.context.strokeStyle = "red"
        }
        this.simulation.context.rect(100, 100, 49, 50)
        
        let digitalInput = document.getElementById("digitalInput")
        if(!this.selected){
            digitalInput = document.getElementById("digitalInput")
        }
        else{
            digitalInput = document.getElementById("digitalInput1")
        }
        this.simulation.context.drawImage(digitalInput, this.position.x, this.position.y, 49, 40);

        if(this.value == 1){
            this.simulation.context.fillStyle = "#ffff82"
            this.simulation.context.fillRect(this.position.x+24, this.position.y+11, 15, 18)
        }
        else{
            this.simulation.context.fillStyle = "#ffffff"
            this.simulation.context.fillRect(this.position.x+24, this.position.y+11, 15, 18)
        }
        

        this.simulation.context.fillStyle = "rgba(0, 0, 0, 1)"
        this.simulation.context.strokeStyle = "#000"
    }

    update = ()=>{
        if(this.inputIds[0] !== undefined){
            this.value = this.simulation.components[this.inputIds[0]].outputs[this.inputNodes[0]]
        }
        else{
            this.value = 0
        }
        this.draw()

    }
}