import React from "react";

type Node = { id: number; x: number; y: number };

function Canvas({
	nodes,
	onDrag,
}: {
	nodes: Node[];
	onDrag: (id: number, x: number, y: number) => void;
}) {
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

	return (
		<div className="flex-1 relative bg-green-50 h-screen">
			{nodes.map((node) => (
				<div
					key={node.id}
					style={{ left: node.x, top: node.y }}
					className="absolute card w-60 bg-base-100 shadow-xl rounded cursor-move"
					onMouseDown={(e) => handleMouseDown(e, node.id)}
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
