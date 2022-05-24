import { ReactElement } from "react";
export declare const reorder: <T>(original: T[], from: number, to: number) => T[];
export declare const DraggableComponent: ({ children, onPosChange }: {
    children: ReactElement[];
    onPosChange?: ((from: number, to: number) => void) | undefined;
}) => JSX.Element;
