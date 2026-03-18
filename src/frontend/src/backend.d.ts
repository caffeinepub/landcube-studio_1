import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    id: bigint;
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    getSubmission(id: bigint): Promise<Submission>;
    initializeAdmin(): Promise<void>;
    isAdmin(): Promise<boolean>;
    submitForm(name: string, email: string, message: string): Promise<void>;
}
