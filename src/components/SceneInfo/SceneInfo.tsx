import {Component} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./scene-info.css";

interface ISceneInfo {
    controls: OrbitControls;
}

interface ISceneInfoState {
    x: number,
    y: number,
    z: number
}

export class SceneInfo extends Component<ISceneInfo, ISceneInfoState> {
    constructor(props: ISceneInfo) {
        super(props);

        const position = this.props.controls.object.position;
        this.state = {
            x: position.x,
            y: position.y,
            z: position.z
        }
    }

    private _updatePosition(): void {
        const position = this.props.controls.object.position;
        this.setState({
            x: position.x,
            y: position.y,
            z: position.z
        })
    }

    componentDidMount() {
        this.props.controls.addEventListener("change", () => {
            this._updatePosition()
        })
    }

    render() {
        return (
            <div className="scene-info">
                X:{Math.round(this.state.x)} Y:{Math.round(this.state.y)} Z:{Math.round(this.state.z)}
            </div>
        );
    }
}
