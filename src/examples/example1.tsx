import React, {useCallback} from "react";
import { Draggable } from "../lib";

const STATE = ["Hello", "Hi", "How are you", "Cool"];


export const Example1 = () => {
	const getChangedPos = useCallback((currentPos, newPos) => {
    console.log(currentPos, newPos);
  }, []);

	return (
		<div className="column">
			<Draggable onPosChange={getChangedPos}>
				{STATE.map((word, idx) => {
					return (
						<div key={`row-1-${idx}`} className="flex-item">
							{word}
						</div>
					);
				})}
			</Draggable>
		</div>
	)
}