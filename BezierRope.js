// Control points
let P0, P3;
let P1_spring, P2_spring;

// Return control point 
function getP(i) {
    switch (i) {
        case 0: return P0;
        case 1: return P1_spring.position;
        case 2: return P2_spring.position;
        case 3: return P3;
        default:
            throw new Error("Invalid control point");
    }
}

// Cubic Bezier point calculation (B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃)
function calculateBezierPoint(t) {
    const p0 = getP(0);
    const p1 = getP(1);
    const p2 = getP(2);
    const p3 = getP(3);

    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;

    const term0 = p0.scale(uu * u);
    const term1 = p1.scale(3 * uu * t);
    const term2 = p2.scale(3 * u * tt);
    const term3 = p3.scale(tt * t);

    return term0.add(term1).add(term2).add(term3);
}


//  Tangent Vector Calculation (B'(t)) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂))
function calculateTangent(t) {
    const p0 = getP(0);
    const p1 = getP(1);
    const p2 = getP(2);
    const p3 = getP(3);

    const u = 1 - t;

    const v01 = p1.subtract(p0);
    const v12 = p2.subtract(p1);
    const v23 = p3.subtract(p2);

    const t0 = v01.scale(3 * u * u);
    const t1 = v12.scale(6 * u * t);
    const t2 = v23.scale(3 * t * t);

    return t0.add(t1).add(t2).normalize();
}

//Bezier curve
function drawCurve(ctx, step = 0.01) {
    ctx.beginPath();

    const start = calculateBezierPoint(0);
    ctx.moveTo(start.x, start.y);

    for (let t = step; t <= 1; t += step) {
        const p = calculateBezierPoint(t);
        ctx.lineTo(p.x, p.y);
    }

    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 4;
    ctx.stroke();
}

//tangent lines 
function drawTangents(ctx, gap = 0.15, length = 30) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1.5;

    for (let t = gap; t < 1; t += gap) {
        const point = calculateBezierPoint(t);
        const tangent = calculateTangent(t);
        const end = point.add(tangent.scale(length));

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
}
