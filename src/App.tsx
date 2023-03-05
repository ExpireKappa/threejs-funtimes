import { RefObject, useEffect, useRef } from 'react';
import { DirectionalLight, PerspectiveCamera, Scene, WebGL1Renderer } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const animateScene = (containerRef: RefObject<HTMLCanvasElement>) => {
  const canvas = containerRef.current;
  if (canvas === null) {
    console.log("Canvas element does not exist");
    return;
  }

  const scene = new Scene();
  
  const loader = new GLTFLoader()
  loader.load("https://threejs.org/examples/models/gltf/Horse.glb", (file) => {
    const root = file.scene;
    root.scale.set(0.1, 0.1, 0.1);

    scene.add(root);
  }, (xhr) => {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded");
  }, (error) => {
    console.log("error");
  });

  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(2,2,5);
  scene.add(light);
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const camera = new PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
  camera.position.set(0, 1, 3);
  scene.add(camera);

  const renderer = new WebGL1Renderer({
    canvas: canvas
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  // renderer.gammaOutput = true;

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.tick = () => controls.update();
  controls.addEventListener("change", () => {
      renderer.render(scene, camera);
  })

  function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  }

  animate();
}

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    animateScene(ref);
    
    return () => {

    }
  })
  
  
  return (
    <div>
      <canvas ref={ref}></canvas>
    </div>
  );
}

export default App;
