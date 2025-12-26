interface Links {
    url: string | null | undefined;
    label: string;
    active: boolean;
}

export interface Permission{
    links : Links[];
    form : number;
    to : number;
    total : number;
}
