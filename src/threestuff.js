const loadScene = () => {          
    const canvas = document.querySelector(".webgl");
    const scene = new THREE.Scene();

    const loader = new GLTFLoader();
    loader.load("images/pepe.glb", (glb) => {
        console.log(glb);
        const root = glb.scene;
        root.scale.set(0.1, 0.1, 0.1);

        scene.add(root);
    }, (xhr) => {
        console.log((xhr.loaded/xhr.total * 100) + "% loaded");
    }, (error) => {
        console.log("error");
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
    camera.position.set(0, 1, 3);
    scene.add(camera);

    const renderer = new THREE.WebGL1Renderer({
        canvas: canvas
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.tick = () => controls.update();
    controls.addEventListener("change", () => {
        renderer.render(scene, camera);
    })

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
};