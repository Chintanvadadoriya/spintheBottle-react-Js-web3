import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

const drawSegment = (ctx, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
    ctx.lineTo(centerX + innerRadius * Math.cos(endAngle), centerY + innerRadius * Math.sin(endAngle));
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.lineTo(centerX + outerRadius * Math.cos(startAngle), centerY + outerRadius * Math.sin(startAngle));
    ctx.fillStyle = color;
    ctx.fill();
};
const easeOutQuint = (x) => 1 - Math.pow(1 - x, 5);

const drawWheel = (ctx, centerX, centerY, outerRadius, innerRadius, segments, totalStakes, animationProgress) => {
    let startAngle = 0;
    segments?.forEach((segment) => {
        const arcSize = (2 * Math.PI) * (segment.stake / totalStakes) * animationProgress;
        const endAngle = startAngle + arcSize;
        drawSegment(ctx, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, segment.color);
        startAngle = endAngle;
    });

    
    // let startAngle = 0;
    // segments.forEach((segment, index) => {
    //     // Calculate the arc size based on the segment stake
    //     let arcSize = (2 * Math.PI) * (segment.stake / totalStakes);
    //     if (index === segments.length - 1) {
    //         // For the last segment, adjust the end angle to complete the circle
    //         arcSize = (2 * Math.PI) - startAngle;
    //     }
    //     const endAngle = startAngle + arcSize * animationProgress;
    //     drawSegment(ctx, centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, segment.color);
    //     startAngle = endAngle;
    // });
};

const SpinTheBottle = forwardRef(({ segments, onSpinEnd, totalStakes, spinDuration = 6000, children }, ref) => {
    const [bottleRotation, setBottleRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(0); // New state for animation progress
    // const spinAngleRef = useRef(0);
    const canvasRef = useRef(null);
    const bottleRef = useRef(new Image());
    const animationFrameRef = useRef();

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = Math.min(centerX, centerY) - 20;
        const innerRadius = outerRadius / 1.4;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel(ctx, centerX, centerY, outerRadius, innerRadius, segments, totalStakes, animationProgress);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(bottleRotation * Math.PI / 180);
        ctx.translate(-centerX, -centerY);

        const bottleWidth = bottleRef.current.width;
        const bottleHeight = bottleRef.current.height;
        const scale = (innerRadius / bottleHeight) * 2.3;
        const scaledBottleWidth = bottleWidth * scale;
        const scaledBottleHeight = bottleHeight * scale;
        ctx.drawImage(bottleRef.current, centerX - scaledBottleWidth / 2, centerY - scaledBottleHeight / 2.2, scaledBottleWidth, scaledBottleHeight);

        ctx.restore();
    }, [bottleRotation, segments, totalStakes, animationProgress]);

    useEffect(() => {
        let start = null;
        const duration = 200; // Animation duration in milliseconds
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setAnimationProgress(progress);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [segments]); // Trigger animation on segments change

    useEffect(() => {
        bottleRef.current.onload = () => {
            draw(); // Draw when the image is loaded
        };
        bottleRef.current.src = '/GreenBottle.png';
    }, [draw]);

    useEffect(draw, [draw, segments, totalStakes, animationProgress]);

    const calculateSpinEndAngle = (winningIndex) => {
        let accumulatedAngle = 0;
        for (let i = 0; i < winningIndex; i++) {
            accumulatedAngle += (360 * segments[i].stake) / totalStakes;
        }
        if (!segments[winningIndex]) return;
        const winningSegmentAngle = (360 * segments[winningIndex].stake) / totalStakes;
        const middleOfWinningSegment = accumulatedAngle + winningSegmentAngle / 2;

        return (middleOfWinningSegment + 90) % 360;
        // let accumulatedAngle = 0;
        // for (let i = 0; i < winningIndex; i++) {
        //     accumulatedAngle += (360 * segments[i].stake) / totalStakes;
        // }
        // if (!segments[winningIndex]) return;
        // const winningSegmentAngle = (360 * segments[winningIndex].stake) / totalStakes;
        // // For the last segment, adjust the angle to ensure the wheel forms a full circle
        // const middleOfWinningSegment = winningIndex === segments.length - 1 ?
        //     360 :
        //     accumulatedAngle + winningSegmentAngle / 2;

        // return (middleOfWinningSegment + 90) % 360;
    };

    const animateSpin = useCallback((winningIndex) => {
        let startTimestamp;

        const endAngle = calculateSpinEndAngle(winningIndex);
        const finalAngle = 360 * 10 + endAngle;
        const initialRotation = bottleRotation;

        const spinStep = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsedTime = timestamp - startTimestamp;
            const progress = Math.min(elapsedTime / spinDuration, 1); // Use the spinDuration prop
            const currentSpinAmount = (finalAngle - (initialRotation % 360)) * easeOutQuint(progress);

            setBottleRotation(initialRotation + currentSpinAmount);

            if (progress < 1) {
                requestAnimationFrame(spinStep);
            } else {
                setBottleRotation(initialRotation + finalAngle - (initialRotation % 360));
                setIsSpinning(false);
                onSpinEnd(winningIndex);
            }
        };

        if (!isSpinning) {
            setIsSpinning(true);
            requestAnimationFrame(spinStep);
        }
    }, [onSpinEnd, bottleRotation, segments, totalStakes, spinDuration, isSpinning]); // Include spinDuration in the dependency array





    useImperativeHandle(ref, () => ({
        spinBottle: (winningIndex) => {
            if (!isSpinning) {
                setIsSpinning(true);
                // Trigger the spin with the winningIndex. The actual calculation of the end angle will happen in animateSpin.
                animationFrameRef.current = requestAnimationFrame(() => animateSpin(winningIndex));
            }
        }
    }));

    const spin = (winningIndex) => {
        if (!isSpinning) {
            setIsSpinning(true);
            // Trigger the spin with the winningIndex. The actual calculation of the end angle will happen in animateSpin.
            animationFrameRef.current = requestAnimationFrame(() => animateSpin(winningIndex));
        }

    }

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div style={{
            // background: 'url(/wood.png)',
            // backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '41px'
        }}>
            <canvas ref={canvasRef} width={600} height={600} />
            <div style={{ width: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {children}
            </div>
            {/* The `spinBottle` method is now exposed via ref, allowing parent components to trigger spinning */}
            {/* <button onClick={() => spin(0)}>Spin</button> */}
        </div>
    );
});

export default SpinTheBottle;
