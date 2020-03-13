import { List, Record } from 'immutable';

export class Post {
    id: number;
    name: string;
    publisher: string;
    title: string;
    preview: string;
    content: string;
    category: string;
    publishedBy: any; // ~ ~
    editedBy: any; //

    constructor() {}
}
