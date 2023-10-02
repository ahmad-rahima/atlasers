//// auth
export interface User {
    _id: string;
    username: string;
}

// POST /auth/register
export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

// POST /auth/login
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

// POST /auth/token
export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    // refreshToken: string; NOT YET!
    message: string;
}

// GET /auth/logout
export interface LogoutResponse {
    message: string;
}


//// profiles

export interface Profile {
    id?: string;
    displayName?: string;
    bio?: string;
    born?: Date;
    joined?: Date;
    gender?: string;
    nationality?: string;
}

// GET /profiles/:id
export interface ProfilesIdGetResponse {
    message: string;
    profile: Profile;
}

// GET /profiles
export interface ProfilesGetResponse {
    message: string;
    profiles: Profile[];
}

// POST /profiles
export type ProfilesAddRequest = Profile;

export interface ProfilesAddResponse {
    message: string;
    profile: Profile;
}

// PUT /profiles/:id
export type ProfilesIdUpdateRequest = Profile;

export interface ProfilesIdUpdateResponse {
    message: string;
    profile: Profile;
}

// DELETE /profiles/:id
export interface ProfilesIdDeleteResponse {
    id: string;
    message: string;
}

// GET /profiles/:id/posts
export interface ProfilesIdGetPostsResponse {
    message: string;
    posts: Post[]; // TODO: change this later!!
}


//// Posts

export interface Comment {
    user: User;
    content: string;
}

export interface Post {
    _id?: string;
    user: User;
    file: string;
    content: string;
    date: Date;
    loves: number;
    loved?: boolean;
    comments: Comment[];
}

// GET /posts
export interface PostsGetResponse {
    posts: Post[];
    message: string;
}

// GET /posts/:id
export interface PostsIdGetResponse {
    post: Post;
    message: string;
}

// POST /posts
export interface PostAddRequest {
    content: string;
}

export type PostAddResponse = PostsIdGetResponse;

// POST /posts/:id/comments
export interface PostIdAddCommentRequest {
    content: string;
}

export interface PostIdAddCommentResponse {
    comment: Comment;
    message: string;
}

// PUT /posts/:id
export interface PostIdUpdateRequest {
    content: string;
}

export type PostIdUpdateResponse = PostsIdGetResponse;

// DELETE /posts/:id
export interface PostIdDeleteResponse {
    id: string;
    message: string;
}

// POST /posts/:id/love
export interface PostIdLoveResponse {
    message: string,
    id: string,
    loves: number,
}