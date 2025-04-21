import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

function App() {
	const [nodes, setNodes] = useState([{ id: 1, x: 100, y: 100 }]);

	return (
		<div className="flex">
			<Sidebar
				onAdd={() => {
					const newId = nodes.length + 1;
					setNodes([...nodes, { id: newId, x: 150, y: 150 }]);
				}}
			/>
			<Canvas nodes={nodes} />
		</div>
	);
}

export default App;
