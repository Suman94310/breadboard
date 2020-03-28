export default class DigitalSource{
    constructor(simulation, position){
        this.position = position;
        this.value = 1;
        this.output = this.value;
        this.simulation = simulation;
        this.selected = 0;
        this.nodeOffsets = [{x:40+7, y:20}]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x &&
            position.x <= this.position.x + 49 +3 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 40 )
            {
                this.selected = 1
                if(position.y > this.position.y + 11 && position.y < this.position.y + 29 && position.x > this.position.x +10 && position.x <this.position.x +25) this.value = Math.abs(1-this.value)
                if(position.x > this.position.x + 40 - 3){
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
        
        let digitalSource = document.getElementById("digitalSource")
        if(!this.selected){
            digitalSource = document.getElementById("digitalSource")
        }
        else{
            digitalSource = document.getElementById("digitalSource1")
        }
        // console.log(digitalSource.style.filter)
        this.simulation.context.drawImage(digitalSource, this.position.x, this.position.y, 49, 40);

        if(this.value == 1){
            this.simulation.context.fillStyle = "#ffff82"
            this.simulation.context.fillRect(this.position.x+10, this.position.y+11, 15, 18)
        }
        else{
            this.simulation.context.fillStyle = "#ffffff"
            this.simulation.context.fillRect(this.position.x+10, this.position.y+11, 15, 18)
        }
        this.simulation.context.fillStyle = "rgba(0, 0, 0, 1)"
        this.simulation.context.strokeStyle = "#000"
    }

    update = ()=>{
        this.draw()
    }
}