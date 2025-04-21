import React from "react";

function Canvas({ nodes }: { nodes: { id: number; x: number; y: number }[] }) {
	return (
		<div className="flex-1 relative bg-green-50 h-screen">
			{nodes.map((node) => (
				<div
					key={node.id}
					style={{ left: node.x, top: node.y }}
					className="absolute card w-60 bg-base-100 shadow-xl border rounded"
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
