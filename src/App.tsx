import FlowField from './components/FlowField/flowfield';
import { Config } from './components/FlowField/types';
import { Github } from 'react-bootstrap-icons';
import { useState } from 'react';
import getColors from './utils';
import '@m7kra/react-utils/lib/css/theme.css';
import './App.css';

export default function App() {
    const [config, setConfig] = useState<Config>(getConfig());
    window.onresize = () => setConfig(getConfig());

    const colors = getColors();

    return <div id='app' className='surface'>
        <FlowField config={config} />
        <div id='card' style={{backgroundColor: colors.backgroundTransparent}}>
            <h1>FlowFields</h1>
            <p><a className='primary-link' href='https://m7kra.github.io'>M7kra</a>'s hidden talent for art (and plagiarism)</p>
            <a className='on-surface-link' href='https://github.com/flow'><Github size={32} /></a>
        </div>
    </div>
}

function getConfig() {
    // A point for each 1500 pixels seems to be a good ratio
    const pointCount = Math.round((window.innerWidth * window.innerHeight) / 1500);
    // The same ratio works for the scale
    const scale = Math.round((window.innerWidth * window.innerHeight) / 1500);

    const colors = getColors();
    return {
        color: colors.color,
        backgroundColor: colors.background,
        pointCount,
        width: window.innerWidth,
        height: window.innerHeight,
        scale,
        simulationSpeed: 0.1,
        pointSpeed: 100,
        pointMass: 0.04
    };
}
