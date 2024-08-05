export interface Grupos {
    id:      number;
    nombre:  string;
    periodo: string;
    docente: Docente;
    materia: Materia;
}

export interface Docente {
    id:    number;
    name:  string;
    ci:    string;
    email: string;
    phone: string;
    user:  User;
}

export interface User {
    id:         number;
    codigo:     string;
    contraseña: string;
    rol:        Rol;
}

export interface Rol {
    id:     number;
    nombre: string;
}

export interface Materia {
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
    facultad: Rol;
}
