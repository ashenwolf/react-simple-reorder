import React, {useCallback} from "react";
import { Draggable } from "../lib";

const STATE = {
	words: ["Hello", "Hi", "How are you", "Cool"],
	languages: ["C", "C++", "Java", "JS"],
	shows: ["GOT", "Friends", "Big Bang"],
};


export const Example2 = () => {
	const getChangedPos = useCallback((currentPos, newPos) => {
    console.log(currentPos, newPos);
  }, []);

	return (
		<div className="flex-container">
			<Draggable onPosChange={getChangedPos}>
				<div className="column">
					<p className="text">Words</p>
					<Draggable onPosChange={getChangedPos}>
						{STATE.words.map((word, idx) => {
							return (
								<div key={`row-1-${idx}`} className="flex-item">
									{word}
								</div>
							);
						})}
					</Draggable>
				</div>
				<div className="column">
					<p className="text">Languages</p>
					<Draggable onPosChange={getChangedPos}>
						{STATE.languages.map((lng, idx) => {
							return (
								<div key={`row-2-${idx}`} className="flex-item">
									{lng}
								</div>
							);
						})}
					</Draggable>
				</div>
				<div className="column">
					<p className="text">Shows</p>
					<Draggable onPosChange={getChangedPos}>
						{STATE.shows.map((lng, idx) => {
							return (
								<div key={`row-3-${idx}`} className="flex-item">
									{lng}
								</div>
							);
						})}
					</Draggable>
				</div>
			</Draggable>
		</div>		
	)
}