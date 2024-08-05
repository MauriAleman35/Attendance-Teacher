export interface Materia {
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
    id:      number;
    sigla:   string;
    nombre:  string;
    credito: number;
    carrera: Carrera;
}

export interface Carrera {
    id:       number;
    nombre:   string;
    codigo:   string;
    facultad: Facultad;
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
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
