import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const client = new QueryClient({});

export const api = axios.create({
  baseURL: "https://api.genius.com/",
});
