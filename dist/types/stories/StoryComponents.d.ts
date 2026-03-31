import React from 'react';
export declare const StoryPage: ({ children, maxWidth, }: {
    children: React.ReactNode;
    maxWidth?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const StoryHeader: ({ title, description, }: {
    title: string;
    description?: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const Section: ({ title, description, children, }: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const PropsTable: ({ columns, rows, }: {
    columns?: string[];
    rows: (string | React.ReactNode)[][];
}) => import("react/jsx-runtime").JSX.Element;
export declare const Row: ({ label, description, children, }: {
    label?: string;
    description?: string;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DemoBox: ({ children, label, width, }: {
    children: React.ReactNode;
    label?: string;
    width?: number | string;
}) => import("react/jsx-runtime").JSX.Element;
