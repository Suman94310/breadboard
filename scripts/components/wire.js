export default class Wire{
    constructor(simulation, left, right, lId, rId){
        this.simulation = simulation
        this.left = left
        this.right = right
        this.lId = lId
        this.rId = rId
    }

    draw = ()=>{
        let offset = 50
        if(this.left.position.x + this.left.nodeOffset.x> this.right.position.x + this.right.nodeOffset.x){
            offset *= -1
        }
        this.simulation.context.moveTo(this.left.position.x + this.left.nodeOffset.x, 
                                        this.left.position.y + this.left.nodeOffset.y);
        this.simulation.context.bezierCurveTo(this.left.position.x + this.left.nodeOffset.x + offset, 
                                            this.left.position.y + this.left.nodeOffset.y, 
                                            this.right.position.x + this.right.nodeOffset.x - offset, 
                                            this.right.position.y + this.right.nodeOffset.y, 
                                            this.right.position.x + this.right.nodeOffset.x, 
                                            this.right.position.y + this.right.nodeOffset.y);
        this.simulation.context.stroke();
    }

    update = ()=>{
        this.draw()
    }
}