import React, { useState, useEffect, useCallback, ReactElement } from "react";

import style from "./draggable.module.css";

interface DraggableComponentIndexes {
  to: number | null;
  from: number | null;
}

export const DraggableComponent = ({
  children,
  onPosChange
}: {
  children: ReactElement[],
  onPosChange?: (from: number, to: number) => void
}) => {
  const [elems, setElems] = useState<ReactElement[]>([]);
  const [indexes, setIndexes] = useState<DraggableComponentIndexes>({ to: null, from: null });

  useEffect(() => {
    setElems(children);
  }, [children]);

  const insertElementBefore = useCallback(() => {
    if (indexes.from !== null && indexes.to !== null && indexes.from !== indexes.to) {
      const {from, to} = indexes;
      const elemsCopy = elems.flatMap((elem, i) => {
        switch(i) {
          case to:
            return to - from > 0 ? [elem, elems[from]] : [elems[from], elem];
          case from:
            return [];
          default:
            return [elem]
        }
      });
      setElems(elemsCopy);

      onPosChange && 
        ((to - from > 0) ? onPosChange(to, from) : onPosChange(from, to));
    }
    setIndexes({to: null, from: null});    
  }, [indexes, elems, onPosChange, setElems, setIndexes]);

  const dragStart = useCallback((idx: number) => {
    if (idx !== indexes.from)
      setIndexes((state: DraggableComponentIndexes) => ({...state, from: idx}));
  }, [setIndexes, indexes]);

  const dragEnter = useCallback((idx: number) => {
    if (idx !== indexes.to)
      setIndexes((state: DraggableComponentIndexes) => ({...state, to: idx}));
  }, [setIndexes, indexes]);

  const dragDrop = useCallback(() => {
    insertElementBefore();
  }, [insertElementBefore]);

  return <React.Fragment>
    {elems?.map((item: ReactElement, i: number) => React.cloneElement(item, {
      key: `clone-${i}`,
      draggable: true,
      onDragStart: () => dragStart(i),
      onDragOver: (e: DragEvent) => {dragEnter(i); e.preventDefault();},
      onDrop: () => dragDrop(),
      className: `${item.props.className} ${style.grabbable}`
    }))}</React.Fragment>;
};
