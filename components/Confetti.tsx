
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    width: number;
    height: number;
}

// This is a simplified placeholder for a confetti effect.
// A real implementation would use a library like 'react-confetti' which uses canvas.
const Confetti: React.FC<ConfettiProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if(!context) return;
        
        canvas.width = width;
        canvas.height = height;
        
        const pieces: any[] = [];
        const numberOfPieces = 200;
        const colors = ['#0ea5e9', '#6366f1', '#ec4899', '#f59e0b', '#10b981'];

        function createPiece() {
            return {
                x: Math.random() * width,
                y: -20,
                w: 5 + Math.random() * 10,
                h: 5 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngle: 0,
                tiltAngleIncrement: Math.random() * 0.07 + 0.05,
                speed: Math.random() * 3 + 2,
            };
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(createPiece());
        }

        let animationFrameId: number;

        function update() {
            context!.clearRect(0, 0, width, height);

            pieces.forEach((p, i) => {
                p.y += p.speed;
                p.tiltAngle += p.tiltAngleIncrement;
                p.x += Math.sin(p.tiltAngle);
                p.tilt = Math.sin(p.tiltAngle) * 15;

                if (p.y > height) {
                    pieces[i] = createPiece();
                    pieces[i].y = -20;
                }

                context!.fillStyle = p.color;
                context!.beginPath();
                context!.save();
                context!.translate(p.x + p.w / 2, p.y + p.h / 2);
                context!.rotate(p.tilt * Math.PI / 180);
                context!.rect(-p.w / 2, -p.h / 2, p.w, p.h);
                context!.fill();
                context!.restore();
            });

            animationFrameId = requestAnimationFrame(update);
        }

        update();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [width, height]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }} />;
};

export default Confetti;
