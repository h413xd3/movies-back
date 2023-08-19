import express from 'express';

export type Method = 'get' | 'post' | 'delete';

export interface Route {
    method: Method;
    path: string;
    middlewares?: express.RequestHandler[];
    controller: express.RequestHandler;
}