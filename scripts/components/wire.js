import adaptiveBezierCurve from '../adaptive-bezier-curve.js'
const adaptivePoints = adaptiveBezierCurve()

export default class Wire{
    constructor(simulation, left, right, lId, rId){
        this.simulation = simulation
        this.left = left
        this.right = right
        this.lId = lId
        this.rId = rId
        this.selected = 0
        this.adaptivePts = undefined
    }

    isClicked = (position)=>{
        let multiplier = 0.0007
        let selectionDist = 10
        
        let offset = multiplier*(Math.pow(this.left.position.x - this.right.position.x,2) + 
                                Math.pow(this.left.position.y - this.right.position.y,2))

        this.adaptivePts = adaptivePoints([this.left.position.x + this.left.nodeOffset.x,
                                        this.left.position.y + this.left.nodeOffset.y],
                                        [this.left.position.x + this.left.nodeOffset.x + offset, 
                                        this.left.position.y + this.left.nodeOffset.y],
                                        [this.right.position.x + this.right.nodeOffset.x - offset, 
                                        this.right.position.y + this.right.nodeOffset.y],
                                        [this.right.position.x + this.right.nodeOffset.x, 
                                        this.right.position.y + this.right.nodeOffset.y]
                                        )
        
        for(let i=0; i<this.adaptivePts.length; i++){
            if(this.right.position.y + this.right.nodeOffset.y < this.left.position.y + this.left.nodeOffset.y){
                if(position.y > this.adaptivePts[i][1]){
                    if(i==0){
                        let distance = Math.pow(position.x - this.adaptivePts[i][0],2) +
                                        Math.pow(position.y - this.adaptivePts[i][1],2)
                        if(distance < selectionDist){
                            this.selected =1
                            return true
                        }
                        else {
                            this.selected = 0
                            return false
                        }
                    }
                    else{
                        let x1 = this.adaptivePts[i-1][0]
                        let y1 = this.adaptivePts[i-1][1]
                        let x2 = this.adaptivePts[i][0]
                        let y2 = this.adaptivePts[i][1]
                        let distance = Math.abs((x2-x1)*position.y - (y2-y1)*position.x + (y2-y1)*x1 - (x2-x1)*y1)/
                                        Math.pow(Math.pow(x2-x1,2) + Math.pow(y2-y1,2),0.5)
                        if(distance < selectionDist){
                            this.selected = 1
                            return true
                        }
                        else {
                            this.selected = 0
                            return false
                        }
                    }
                }
            }
            else{
                if(position.y < this.adaptivePts[i][1]){
                    if(i==0){
                        let distance = Math.pow(position.x - this.adaptivePts[i][0],2) +
                                        Math.pow(position.y - this.adaptivePts[i][1],2)
                        if(distance < selectionDist){
                            this.selected = 1
                            return true
                        }
                        else {
                            this.selected = 0
                            return false
                        }
                    }
                    else{
                        let x1 = this.adaptivePts[i-1][0]
                        let y1 = this.adaptivePts[i-1][1]
                        let x2 = this.adaptivePts[i][0]
                        let y2 = this.adaptivePts[i][1]
                        let distance = Math.abs((x2-x1)*position.y - (y2-y1)*position.x + (y2-y1)*x1 - (x2-x1)*y1)/
                                        Math.pow(Math.pow(x2-x1,2) + Math.pow(y2-y1,2),0.5)
                        if(distance < selectionDist){
                            this.selected = 1
                            return true
                        }
                        else {
                            this.selected = 0
                            return false
                        }
                    }
                }
            }
        }
        this.selected = 0
        return false
    }

    draw = ()=>{
        let multiplier = 0.0007
        
        let offset = multiplier*(Math.pow(this.left.position.x - this.right.position.x,2) + 
                                Math.pow(this.left.position.y - this.right.position.y,2))

        if (this.selected)this.simulation.context.strokeStyle='red';
        
        this.simulation.context.moveTo(this.left.position.x + this.left.nodeOffset.x, 
                                        this.left.position.y + this.left.nodeOffset.y);
        this.simulation.context.bezierCurveTo(this.left.position.x + this.left.nodeOffset.x + offset, 
                                            this.left.position.y + this.left.nodeOffset.y, 
                                            this.right.position.x + this.right.nodeOffset.x - offset, 
                                            this.right.position.y + this.right.nodeOffset.y, 
                                            this.right.position.x + this.right.nodeOffset.x, 
                                            this.right.position.y + this.right.nodeOffset.y);
        this.simulation.context.stroke();
        this.simulation.context.strokeStyle='black'
    }

    update = ()=>{
        this.draw()
    }
}