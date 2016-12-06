import { AxiosErrorResponse } from "../util";

/** Main */
export interface ToolsState {
    editorMode: boolean;
    tool_bays: ToolBay[];
    tool_slots: ToolSlot[];
    tools: {
        isEditing: boolean;
        all: Tool[];
    };
}

/** Related */
export interface ListAndFormProps {
    dispatch: Function;
    all: ToolsState;
}

export interface ToolBay {
    id: number;
    name: string;
    isEditing?: boolean;
    dirty?: boolean;
}

export interface ToolBayFormState {
    x?: number;
    y?: number;
    z?: number;
    tool_id?: number;
}

export interface ToolFormState {
    name: string;
    id?: number;
}

export interface ToolSlot {
    id?: number;
    tool_bay_id?: number;
    tool_id?: number;
    created_at?: string;
    x?: number;
    y?: number;
    z?: number;
    dirty?: boolean;
}

export interface UpdateToolSlotPayl {
    value: number;
    name: string;
    id: number;
}

export interface Tool {
    id: number;
    name: string;
}

/** Actions */
export interface ErrorPayl {
    type: string;
    payload: AxiosErrorResponse;
}
