let scene, camera, renderer, earth, moon;

function init() {
    const container = document.getElementById('scene-container');

    // Initialisation de la scène
    scene = new THREE.Scene();

    // Caméra
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);

    // Rendu
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lumière
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Texture Terre
    const earthTexture = new THREE.TextureLoader().load(
        'earth.jpg',
        () => { console.log('Texture Terre chargée.'); },
        undefined,
        (error) => { console.error('Erreur lors du chargement de la texture de la Terre :', error); }
    );

    const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Texture Lune
    const moonTexture = new THREE.TextureLoader().load(
        'mars.jpg',
        () => { console.log('Texture Lune chargée.'); },
        undefined,
        (error) => { console.error('Erreur lors du chargement de la texture de la Lune :', error); }
    );

    const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(3, 1, 0);
    scene.add(moon);

    // Étoiles
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
        starVertices.push((Math.random() - 0.5) * 1000);
        starVertices.push((Math.random() - 0.5) * 1000);
        starVertices.push((Math.random() - 0.5) * 1000);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    animate();
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotation de la Terre et de la Lune
    earth.rotation.y += 0.005;
    moon.rotation.y += 0.005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function closeLogin() {
    document.getElementById('login-container').classList.add('hidden');
}

// Démarrage de la scène
init();
