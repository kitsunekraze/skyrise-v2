const glow = document.querySelector('.mouse-glow');

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('bg').appendChild(renderer.domElement);

const particles = new THREE.BufferGeometry();

const count = 1000;
const positions = [];

for (let i = 0; i < count; i++) {
    positions.push((Math.random() - 0.5) * 100);
    positions.push((Math.random() - 0.5) * 100);
    positions.push((Math.random() - 0.5) * 100);
}

particles.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
    size: 0.15
});

const points = new THREE.Points(
    particles,
    material
);

scene.add(points);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);

    points.rotation.y += 0.0008;
    points.rotation.x += 0.0003;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});