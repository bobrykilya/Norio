import { Request, Response } from 'express'



export type UserStatusOptions = 'active' | 'inactive' | 'blocked';

export type ExpressRes = Response;
export type ExpressReq = Request;
