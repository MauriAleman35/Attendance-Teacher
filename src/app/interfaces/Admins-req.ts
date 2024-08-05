export interface Admins {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    content:          Content[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Content {
    id:    number;
    name:  string;
    email: string;
    ci:    string;
    phone: string;
    user:  User;
}

export interface User {
    id:         number;
    codigo:     string;
    contraseña: string;
    rol:        Rol | null;
}

export interface Rol {
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
