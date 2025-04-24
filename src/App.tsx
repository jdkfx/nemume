import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

function App() {
	const [nodes, setNodes] = useState([{ id: 1, x: 100, y: 100 }]);
	const [connections, setConnections] = useState([{ from: 1, to: 2 }]);

	const handleAddNode = () => {
		const newId = nodes.length + 1;
		setNodes([...nodes, { id: newId, x: 150, y: 150 }]);
	};

	const handleDrag = (id: number, x: number, y: number) => {
		setNodes((prev) =>
			prev.map((node) => (node.id === id ? { ...node, x, y } : node)),
		);
	};

	return (
		<div className="flex">
			<Sidebar onAdd={handleAddNode} />
			<Canvas nodes={nodes} onDrag={handleDrag} connections={connections} />
		</div>
	);
}

export default App;
