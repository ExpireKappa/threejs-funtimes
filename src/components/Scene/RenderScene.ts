import {RefObject} from "react";
import {DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGL1Renderer, WebGLRenderer} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const renderScene = (renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) => {

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

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}
