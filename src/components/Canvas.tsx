import React, { useRef } from "react";

type Node = { id: number; x: number; y: number };
type Connections = { from: number; to: number };

function Canvas({
	nodes,
	connections,
	onDrag,
	onNodeClick,
	selectedNodeId,
}: {
	nodes: Node[];
	connections: Connections[];
	onDrag: (id: number, x: number, y: number) => void;
	onNodeClick: (id: number) => void;
	selectedNodeId: number | null;
}) {
	const nodeRefs = useRef<Map<number, HTMLDivElement>>(new Map());
	const canvasRefs = useRef<HTMLDivElement | null>(null);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
		const startX = e.clientX;
		const startY = e.clientY;

		const node = nodes.find((n) => n.id === id);
		if (!node) return;

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const dx = moveEvent.clientX - startX;
			const dy = moveEvent.clientY - startY;
			onDrag(id, node.x + dx, node.y + dy);
		};

		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	const getLineCoordinates = (fromId: number, toId: number) => {
		const fromElement = nodeRefs.current.get(fromId);
		const toElement = nodeRefs.current.get(toId);
		const canvasElement = canvasRefs.current;

		if (!fromElement || !toElement || !canvasElement) return null;

		const canvasRect = canvasElement.getBoundingClientRect();
		const fromRect = fromElement.getBoundingClientRect();
		const toRect = toElement.getBoundingClientRect();

		const fromX = fromRect.left + fromRect.width / 2 - canvasRect.left;
		const fromY = fromRect.top + fromRect.height / 2 - canvasRect.top;
		const toX = toRect.left + toRect.width / 2 - canvasRect.left;
		const toY = toRect.top + toRect.height / 2 - canvasRect.top;

		return { fromX, fromY, toX, toY };
	};

	return (
		<div ref={canvasRefs} className="flex-1 relative bg-green-50 h-screen">
			<svg
				className="absolute w-full h-full pointer-events-none"
				style={{ zIndex: 0 }}
			>
				{connections.map((connection, index) => {
					const coords = getLineCoordinates(connection.from, connection.to);
					if (!coords) return null;
					return (
						<g key={index}>
							<line
								key={index}
								x1={coords.fromX}
								y1={coords.fromY}
								x2={coords.toX}
								y2={coords.toY}
								stroke="black"
								strokeWidth="2"
							/>
							<text
								x={coords.fromX + 5}
								y={coords.fromY - 5}
								fontSize="12"
								fill="black"
							>
								({Math.round(coords.fromX)}, {Math.round(coords.fromY)})
							</text>
							<text
								x={coords.toX + 5}
								y={coords.toY - 5}
								fontSize="12"
								fill="black"
							>
								({Math.round(coords.toX)}, {Math.round(coords.toY)})
							</text>
						</g>
					);
				})}
			</svg>

			{nodes.map((node) => (
				<div
					key={node.id}
					style={{ left: node.x, top: node.y }}
					className={`absolute card w-60 bg-base-100 shadow-xl rounded cursor-move
					${selectedNodeId === node.id ? "border-4 border-blue-400" : "bg-base-100"}`}
					onMouseDown={(e) => handleMouseDown(e, node.id)}
					ref={(el) => {
						if (el) nodeRefs.current.set(node.id, el);
					}}
					onClick={() => onNodeClick(node.id)}
				>
					<div className="card-body">
						<h2 className="card-title">ノード: {node.id}</h2>
						<p>
							位置: ({node.x}, {node.y})
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Canvas;
