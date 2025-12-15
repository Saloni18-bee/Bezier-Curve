#Design and Implementation of an Interactive Cubic Bézier Curve

## Introduction

A **Bézier curve** is a mathematically defined curve widely used in **computer graphics and geometric modeling**.  
It is commonly applied in both two-dimensional and three-dimensional graphics applications such as **Adobe Illustrator, Inkscape, animation systems, and modeling software**.

Bézier curves are preferred because they produce smooth shapes and allow intuitive control through a small number of control points.

This project implements an **interactive cubic Bézier curve** on the web using **HTML Canvas and JavaScript**.  
The curve behaves like a flexible rope and responds smoothly to **mouse movement** using a simple **spring–damping physics model**.

---

## Objective

The main objectives of this project are to demonstrate:

- Understanding of cubic Bézier curve mathematics  
- Vector-based motion and curve evaluation  
- Tangent calculation using derivatives  
- Basic physics (spring and damping) for smooth animation  
- Real-time rendering and user interaction  

---

## Bézier Curve Basics

A Bézier curve is defined using a set of **control points**:

- **P₀** – Starting point (fixed)  
- **P₃** – Ending point (fixed)  
- **P₁ and P₂** – Intermediate control points (dynamic)  

The curve always starts at **P₀** and ends at **P₃**.  
The intermediate control points influence the direction and curvature of the curve but do not generally lie on it.

---

## Mathematical Representation

Bézier curves are generated using **Bernstein polynomials**, also known as **blending functions**.

The general Bézier curve equation is:
P(t) = ∑ (i = 0 to n) Pi · Bⁿᵢ(t)

Where:
- `Pi` are the control points  
- `Bⁿᵢ(t)` are the Bernstein basis polynomials  
- `n` is the order of the curve  
- `t` is the curve parameter such that `0 ≤ t ≤ 1`

---

### Bernstein Polynomial

The Bernstein polynomial is defined as:

Bⁿᵢ(t) = (n C i) (1 − t)ⁿ⁻ⁱ tⁱ

Where:
- `n` is the degree of the curve  
- `i` is the index of the control point  
- `t` varies from 0 to 1  

---

## Cubic Bézier Curve

A **cubic Bézier curve** consists of **four control points** and has a polynomial degree of **3**.

For a cubic Bézier curve:
- `n = 3`  
- `i = 0, 1, 2, 3`  
- `0 ≤ t ≤ 1`

### Cubic Bézier Curve Equation

P(t) = P₀B³₀(t) + P₁B³₁(t) + P₂B³₂(t) + P₃B³₃(t)

---

### Cubic Bernstein Polynomials
B³₀(t) = (1 − t)³
B³₁(t) = 3(1 − t)²t
B³₂(t) = 3(1 − t)t²
B³₃(t) = t³

---

### Final Cubic Bézier Formula

B(t) = (1 − t)³P₀ + 3(1 − t)²tP₁ + 3(1 − t)t²P₂ + t³P₃

---

## Parametric Form

A Bézier curve is represented parametrically as:

P(t) = { x(t), y(t) }

Where:

x(t) = (1 − t)³x₀ + 3(1 − t)²tx₁ + 3(1 − t)t²x₂ + t³x₃
y(t) = (1 − t)³y₀ + 3(1 − t)²ty₁ + 3(1 − t)t²y₂ + t³y₃

The curve is rendered by incrementing the parameter `t` from `0` to `1` in small steps and plotting the corresponding points on the canvas.

---

## Control Point Physics

The middle control points (**P₁ and P₂**) move smoothly toward a target position based on mouse input.

To avoid abrupt motion, a **spring–damping physics model** is applied:

acceleration = -k * (position − target) − damping * velocity

This produces a natural, rope-like motion where the curve smoothly follows the mouse instead of snapping instantly.

---

## Tangent Visualization

Tangents are computed using the derivative of the cubic Bézier equation:

B'(t) = 3(1 − t)²(P₁ − P₀) + 6(1 − t)t(P₂ − P₁) + 3t²(P₃ − P₂)

The resulting vectors are normalized and drawn as short line segments at regular intervals along the curve to visualize its direction and flow.

---

## Rendering and Interaction

- Rendering is done using **HTML Canvas**
- Mouse movement controls curve deformation
- Animation is handled using `requestAnimationFrame` to maintain smooth performance (~60 FPS)

The following elements are visualized:
- Bézier curve path  
- Control points  
- Tangent vectors  

---

## How to Run

1. Open `index.html` in any modern web browser  
2. Move the mouse to interact with the curve  
3. Observe smooth deformation and tangent visualization  

---

## Conclusion

This project demonstrates the practical implementation of cubic Bézier curves combined with basic physics to achieve smooth, interactive motion.  
It highlights the importance of mathematical modeling and real-time rendering in computer graphics applications.



