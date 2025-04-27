import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

function App() {
	const [nodes, setNodes] = useState([{ id: 1, x: 100, y: 100 }]);
	const [connections, setConnections] = useState([{ from: 1, to: 2 }]);
	const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

	const handleAddNode = () => {
		const newId = nodes.length + 1;
		setNodes([...nodes, { id: newId, x: 150, y: 150 }]);
	};

	const handleDrag = (id: number, x: number, y: number) => {
		setNodes((prev) =>
			prev.map((node) => (node.id === id ? { ...node, x, y } : node)),
		);
	};

	const handleNodeClick = (id: number | null) => {
		if (selectedNodeId === id || id === null) {
			setSelectedNodeId(null);
		} else if (selectedNodeId === null) {
			setSelectedNodeId(id);
		} else {
			setConnections((prev) => [...prev, { from: selectedNodeId, to: id }]);
			setSelectedNodeId(null);
		}
	};

	return (
		<div className="flex">
			<Sidebar onAdd={handleAddNode} />
			<Canvas
				nodes={nodes}
				onDrag={handleDrag}
				connections={connections}
				onNodeClick={handleNodeClick}
				selectedNodeId={selectedNodeId}
			/>
		</div>
	);
}

export default App;
