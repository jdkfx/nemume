import React from "react";

function Sidebar({ onAdd }: { onAdd: () => void }) {
	return (
		<div className="w-1/4 p-4 bg-green-100">
			<button className="btn" onClick={onAdd}>
				ノードを追加
			</button>
		</div>
	);
}

export default Sidebar;
