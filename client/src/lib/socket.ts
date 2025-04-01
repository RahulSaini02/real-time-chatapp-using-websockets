"use client";

import { io } from "socket.io-client";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const socket = io(BACKEND_API);
