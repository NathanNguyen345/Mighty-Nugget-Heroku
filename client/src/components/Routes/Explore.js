import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/core';

import WorldScene from '../Phaser/Scene/WorldScene';
import BattleScene from '../Phaser/Scene/BattleScene';

function Explore() {
    const gameRef = useRef(null);
    const [game, setGame] = useState(null);
    const [init, setInit] = useState(null);

    useEffect(() => {
        setInit(true);
        const config = {
            width: 1200,
            height: 1200,
            type: Phaser.AUTO,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true
                }
            },
            scene: [
                WorldScene,
                BattleScene
            ]
        }
        setGame(config);
    }, [])


    return (
        <div>
            <IonPhaser ref={gameRef} game={game} initialize={init} />
        </div>
    )
}

export default Explore;
