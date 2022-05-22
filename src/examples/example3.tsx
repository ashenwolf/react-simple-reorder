import React, {useCallback} from "react";
import { Draggable } from "../lib";

const STATE = ["Hello", "Hi", "How are you", "Cool"];

const WrappedComponent = (
	{
		className,
		word,
		...props
	}:
	{
		word: string;
		className: string
	}
	) => {

	return (
		<div className={`${className} highlighted`} {...props}>
			{word}
		</div>
	)
}

export const Example3 = () => {
	const getChangedPos = useCallback((currentPos, newPos) => {
    console.log(currentPos, newPos);
  }, []);

	return (
		<div className="column">
			<Draggable onPosChange={getChangedPos}>
				{STATE.map((word, idx) => {
					return <WrappedComponent key={`row-1-${idx}`} className="flex-item" word={word} />
				})}
			</Draggable>
		</div>
	)
}