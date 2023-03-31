import {renderScene} from "./RenderScene";
import React, {Component, createRef, RefObject, useEffect, useRef, useState} from "react";
import "./scene.css";
import {DirectionalLight, PerspectiveCamera, Scene, Vector3, WebGL1Renderer, WebGLRenderer} from "three";
import {SceneInfo} from "../SceneInfo/SceneInfo";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ModelSidebar} from "../ModelSidebar/ModelSidebar";

interface Position {
    x: number
    y: number
    z: number
}

interface ISceneProps {
}

export class WebScene extends Component<{}, {controls: OrbitControls | null, camera: PerspectiveCamera | null}> {
    private readonly container: RefObject<HTMLDivElement>;
    private readonly canvas: RefObject<HTMLCanvasElement>;
    private readonly renderer: WebGLRenderer;
    private readonly scene = new Scene();

    constructor(props: {}) {
        super(props);

        this.container = createRef<HTMLDivElement>();
        this.canvas = createRef<HTMLCanvasElement>();

        this.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.state = {
            controls: null,
            camera: null
        }

    }

    private _mountDOMElement(canvas: HTMLCanvasElement): void {
        if (this.container.current !== null) {
            this.container.current.append(canvas);
        }
    }

    private _setLight(): DirectionalLight {
        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(2,2,5);
        this.scene.add(light);

        return light;
    }

    private _setupScene(): PerspectiveCamera {
        const light = this._setLight();

        const sizes = {
            width: this.container.current !== null ? this.container.current.clientWidth : 0,
            height: this.container.current !== null ? this.container.current.clientHeight : 0
        }

        const camera = new PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
        camera.position.set(25, 15, 25);
        camera.add(light);
        this.scene.add(camera);

        const controls = new OrbitControls(camera, this.renderer.domElement);
        controls.addEventListener("change", () => {
            this.renderer.render(this.scene, camera);
        })

        this.setState({
            controls: controls,
            camera: camera
        })

        return camera;
    }

    // Head - 5,18,14
    // Leg - 5,7,15
    // Rear Leg - -12,14,-2

    componentDidMount() {
        this._mountDOMElement(this.renderer.domElement);
        this.renderer.setSize((this.container.current as HTMLDivElement).clientWidth, (this.container.current as HTMLDivElement).clientHeight);

        const camera = this._setupScene();
        renderScene(this.renderer, this.scene, camera)
    }

    render() {
        return (
            <div className="scene-root">
                {this.state.controls && <SceneInfo controls={this.state.controls}/> }
                <div className="scene-container" ref={this.container}></div>
                <ModelSidebar camera={this.state.camera} controls={this.state.controls}/>
            </div>
        );
    }
}
