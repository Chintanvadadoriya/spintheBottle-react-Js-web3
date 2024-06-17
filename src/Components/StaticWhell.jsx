import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

const drawSegment = (ctx, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
    ctx.lineTo(centerX + innerRadius * Math.cos(endAngle), centerY + innerRadius * Math.sin(endAngle));
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.lineTo(centerX + outerRadius * Math.cos(startAngle), centerY + outerRadius * Math.sin(startAngle));
    ctx.fillStyle = color;
    ctx.fill();
};

const drawWheel = (ctx, centerX, centerY, outerRadius, innerRadius, segments, totalStakes) => {
    let startAngle = -Math.PI / 2; // Start from the top of the circle

    if (segments.length === 1) {
        // Special case for a single segment, draw a full circle
        const color = segments[0].color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI, false);
        ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        segments.forEach((segment, index) => {
            const arcSize = (2 * Math.PI) * (segment.stake / totalStakes);
            let endAngle = startAngle + arcSize;

            // Ensure the last segment closes the circle
            if (index === segments.length - 1 && endAngle !== startAngle + 2 * Math.PI) {
                endAngle = -Math.PI / 2; // Completes the circle back to the starting point
            }

            drawSegment(ctx, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, segment.color);
            startAngle = endAngle;
        });
    }
};



const StaticWhell = ({ segments, totalStakes, winningSegmentIndex = 0, children }) => {
    const canvasRef = useRef(null);
    const bottleRef = useRef(new Image());
    const [bottleRotation, setBottleRotation] = React.useState(0);

    const calculateBottleRotation = (segments, totalStakes, winningIndex) => {
        let startAngle = -Math.PI / 2;
        for (let i = 0; i <= winningIndex; i++) {
            if (i === winningIndex) {
                const segmentAngle = (2 * Math.PI * segments[i].stake) / totalStakes;
                return startAngle + segmentAngle / 2 + Math.PI / 2; // Middle of the segment plus 90 degrees to align top
            }
            startAngle += (2 * Math.PI * segments[i].stake) / totalStakes;
        }
        return 0; // Default rotation if index out of bounds
    };
    

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = Math.min(centerX, centerY) - 20;
        const innerRadius = outerRadius / 1.4;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel(ctx, centerX, centerY, outerRadius, innerRadius, segments, totalStakes);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(bottleRotation);
        ctx.translate(-centerX, -centerY);

        const bottleWidth = bottleRef.current.width;
        const bottleHeight = bottleRef.current.height;
        const scale = (innerRadius / bottleHeight) * 2.3;
        const scaledBottleWidth = bottleWidth * scale;
        const scaledBottleHeight = bottleHeight * scale;
        ctx.drawImage(bottleRef.current, centerX - scaledBottleWidth / 2, centerY - scaledBottleHeight / 2.2, scaledBottleWidth, scaledBottleHeight);

        ctx.restore();
    }, [bottleRotation, segments, totalStakes]);

    useEffect(() => {
        bottleRef.current.onload = () => {
            draw(); // Draw when the image is loaded
        };
        bottleRef.current.src = '/GreenBottle.png'; // Make sure you have the correct path to the bottle image
    }, [draw]);

    useEffect(() => {
        const bottleRotation = calculateBottleRotation(segments, totalStakes, winningSegmentIndex);
        setBottleRotation(bottleRotation);
    }, [segments, totalStakes, winningSegmentIndex]);



    return (
        <div style={{ 
            // background: 'url(/wood.png)', 
            // backgroundPosition: 'center', 
            
            position: 'relative', backgroundSize: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '41px' }}>
            <canvas ref={canvasRef} width={600} height={600} style={{transform:'rotate(90deg)'}} />
            <div style={{ width: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {children}
            </div>
        </div>
    );
};

export default StaticWhell;
