/** @format */

export type User = {
    id: number;
    name: string;
    points: number;
};

export type Mission = {
    id: number;
    title: string;
    description: string;
    duration: number;
    reward_points: number;
    type: string;
    target_value?: number;
};