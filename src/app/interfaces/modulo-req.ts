export interface Modulos {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    id:        number;
    numero:    string;
    direccion: string;
    facultad:  Facultad;
}

export interface Facultad {
    id:     number;
    nombre: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
