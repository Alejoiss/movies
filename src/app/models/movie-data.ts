import { Movie } from "src/app/models/movie";

export class Sort {
    sorted!: boolean;
    unsorted!: boolean;
    empty!: boolean;
}

export class Pageable {
    sort!: Sort;
    pageSize!: number;
    pageNumber!: number;
    offset!: number;
    paged!: boolean;
    unpaged!: boolean;
}

export class MovieData {
    content!: Movie[];
    pageable!: Pageable;
    last!: boolean;
    totalPages!: number;
    totalElements!: number;
    first!: boolean;
    sort!: Sort;
    number!: number;
    numberOfElements!: number;
    size!: number;
    empty!: boolean;
}
