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
    phone: string;
}
export interface Project {
    id: bigint;
    concept: string;
    title: string;
    coverImageId: string;
    year: string;
    galleryImageIds: Array<string>;
    category: string;
    process: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(title: string, category: string, year: string, concept: string, process: string, coverImageId: string, galleryImageIds: Array<string>): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getAllSubmissions(): Promise<Array<Submission>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProjectById(id: bigint): Promise<Project>;
    getSubmission(id: bigint): Promise<Submission>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitForm(name: string, email: string, phone: string, message: string): Promise<void>;
    updateProject(id: bigint, title: string, category: string, year: string, concept: string, process: string, coverImageId: string, galleryImageIds: Array<string>): Promise<void>;
}
