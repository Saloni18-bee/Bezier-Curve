class SpringControlPoint {
    constructor(x, y, k, d) {
        this.position = new Vector2D(x, y); // Current position 
        this.velocity = new Vector2D(0, 0); 
        this.target = new Vector2D(x, y);   
        
        this.k = k || 0.15;   // Spring constant 
        this.damping = d || 0.9; // Damping factor 
        
       
        this.dt = 1;  // Time step 
    }

    updatePhysics() {
        //  Calculate the spring Force (F_spring = -k * displacement)
        const displacement = this.position.subtract(this.target);
        const springForce = displacement.scale(-this.k);

        //  Calculate the acceleration (a = F/m, assuming m=1)
        const acceleration = springForce; 

        // v_new = v_old + a * dt
        this.velocity = this.velocity.add(acceleration.scale(this.dt));
        
        // Apply Damping (slows down the velocity)
        this.velocity = this.velocity.scale(this.damping);

        // x_new = x_old + v * dt
        this.position = this.position.add(this.velocity.scale(this.dt));
    }

    setTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }
}