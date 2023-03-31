import "./model-sidebar.css";
import {Component} from "react";
import {PerspectiveCamera} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface IModelSidebar {
    camera: PerspectiveCamera | null;
    controls: OrbitControls | null
}

export class ModelSidebar extends Component<IModelSidebar> {
    constructor(props: IModelSidebar) {
        super(props);

        this._gotoHead = this._gotoHead.bind(this);
        this._gotoLegs = this._gotoLegs.bind(this);
        this._takeSnapshot = this._takeSnapshot.bind(this);
    }

    private _gotoHead(): void {
        if (this.props.camera !== null && this.props.controls !== null) {
            this.props.camera.position.set(6.177992086075707,17.264813204648362,15.344365163230933)
            this.props.controls.update();

            console.log(this.props.camera.position)
        }

    }

    private _gotoLegs(): void {
        if (this.props.camera !== null && this.props.controls !== null) {
            this.props.camera.position.set(6,7,15);
            this.props.controls.update();

            console.log(this.props.camera.position)
        }
    }

    private _takeSnapshot(): void {
        if (this.props.camera !== null && this.props.controls !== null) {
            console.log(this.props.camera.position, this.props.camera.zoom)
        }
    }

    render() {
        return (
            <div className="model-sidebar-container">
                {/*<button onClick={this._takeSnapshot}>Snap</button>*/}
                <h2>Model</h2>
                <p>Horsey</p>
                <h2>Description</h2>
                <p>This is a horse</p>
                <h2>Context</h2>
                <div>
                    <div>
                        <h3>Head</h3>
                        <p>This is the head of the horse, mainly used for eating and seeing.</p>
                        <button onClick={this._gotoHead}>Load in 3DViewer</button>
                    </div>
                    <div>
                        <h3>Leg</h3>
                        <p>This is the leg of the horse, mainly used for walking.</p>
                        <button onClick={this._gotoLegs}>Load in 3DViewer</button>
                    </div>
                </div>
            </div>
        );
    }
}
