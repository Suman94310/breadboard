export default class Source{
    constructor(simulation, position){
        this.position = position;
        this.value = 1;
        this.output = this.value;
        this.simulation = simulation;
        this.selected = 0;
        this.nodeOffsets = [{x: 25 +10+ 2, y:12}]
    }

    isClicked = (position)=>{
        if(position.x >= this.position.x &&
            position.x <= this.position.x + 25 + 10 + 6 &&
            position.y >= this.position.y &&
            position.y <= this.position.y + 25 +10)
            {
                this.selected = 1
                if(position.y > this.position.y + 25) this.value = Math.abs(1-this.value)
                if(position.x > this.position.x +25 +10){
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
        this.simulation.context.beginPath();
        this.simulation.context.rect(this.position.x, this.position.y, 25, 25)
        this.simulation.context.stroke();

        this.simulation.context.beginPath();
        this.simulation.context.moveTo(this.position.x + 25, this.position.y + 12);
        this.simulation.context.lineTo(this.position.x + 25 +10, this.position.y + 12);
        this.simulation.context.stroke();

        this.simulation.context.beginPath();
        this.simulation.context.arc(this.position.x +25 +10+ 2, this.position.y + 12, 2, 0, 2 * Math.PI);
        this.simulation.context.stroke();

        this.simulation.context.beginPath()
        this.simulation.context.rect(this.position.x, this.position.y+25, 25, 10)
        this.simulation.context.stroke()

        this.simulation.context.font =  "20px Arial";
        this.simulation.context.fillText(this.value, this.position.x + 7, this.position.y + 20);
        
        this.simulation.context.font = "9px Arial"
        this.simulation.context.fillText("0", this.position.x +25/4 -3 , this.position.y + 33)

        this.simulation.context.font = "9px Arial"
        this.simulation.context.fillText("1", this.position.x +25/4 +25/2 -3 , this.position.y + 33)

        if(this.value == 1){
            this.simulation.context.fillStyle = "rgba(0, 0, 0, 0)"
            this.simulation.context.fillRect(this.position.x, this.position.y +25, 25/2, 10)
            this.simulation.context.fillStyle = "rgba(0, 0, 0, 1)"
            this.simulation.context.fillRect(this.position.x +25/2, this.position.y +25, 25/2, 10)
        }
        else{
            this.simulation.context.fillStyle = "rgba(0, 0, 0, 1)"
            this.simulation.context.fillRect(this.position.x, this.position.y +25, 25/2, 10)
            this.simulation.context.fillStyle = "rgba(0, 0, 0, 0)"
            this.simulation.context.fillRect(this.position.x +25/2, this.position.y +25, 25/2, 10)
        }
        this.simulation.context.fillStyle = "rgba(0, 0, 0, 1)"
        this.simulation.context.strokeStyle = "#000"
    }

    update = ()=>{
        this.draw()
    }
}