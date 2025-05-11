'use client';

import React, { useEffect, useRef, useState } from 'react';

const ARENA_SIZE = 600;
const PLAYER_SIZE = 40;
const SPEED = 5;

interface Position {
    x: number;
    y: number;
}

const ArenaBrawl: React.FC = () => {
    const [player, setPlayer] = useState<Position>({
        x: ARENA_SIZE / 2 - PLAYER_SIZE / 2,
        y: ARENA_SIZE / 2 - PLAYER_SIZE / 2,
    });

    const keysPressed = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current[e.key] = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current[e.key] = false;
        };

        const movePlayer = () => {
            setPlayer((prev) => {
                let { x, y } = prev;

                if (keysPressed.current['w'] || keysPressed.current['ArrowUp']) y -= SPEED;
                if (keysPressed.current['s'] || keysPressed.current['ArrowDown']) y += SPEED;
                if (keysPressed.current['a'] || keysPressed.current['ArrowLeft']) x -= SPEED;
                if (keysPressed.current['d'] || keysPressed.current['ArrowRight']) x += SPEED;

                x = Math.max(0, Math.min(ARENA_SIZE - PLAYER_SIZE, x));
                y = Math.max(0, Math.min(ARENA_SIZE - PLAYER_SIZE, y));

                return { x, y };
            });
        };

        const interval = setInterval(movePlayer, 16);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div
            style={{
                width: ARENA_SIZE,
                height: ARENA_SIZE,
                background: '#222',
                position: 'relative',
                margin: '40px auto',
                border: '4px solid #fff',
            }}
        >
            <div
                style={{
                    width: PLAYER_SIZE,
                    height: PLAYER_SIZE,
                    background: 'limegreen',
                    position: 'absolute',
                    left: player.x,
                    top: player.y,
                    borderRadius: '50%',
                }}
            />
        </div>
    );
};

export default ArenaBrawl;
