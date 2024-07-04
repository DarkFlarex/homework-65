export interface ApiPage {
    id: string;
    title: string;
    content: string;
}

export interface ApiPages {
    [id: string]: ApiPage;
}

export interface Page extends ApiPage {
    id: string;
}

export interface PageMutation{
    id: string;
    title: string;
    content: string;
}