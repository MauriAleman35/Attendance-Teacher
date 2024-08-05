export interface Horario {
    id:         number;
    horaInicio: string;
    horaFinal:  string;
    grupo:      Grupo;
    aula:       Aula;
    dias:       Dias;
}

export interface Aula {
    id:        number;
    numero:    string;
    capacidad: number;
    modulo:    Modulo;
}

export interface Modulo {
    id:        number;
    numero:    string;
    direccion: string;
    facultad:  Dias;
}

export interface Dias {
    id:     number;
    nombre: string;
}

export interface Grupo {
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
    rol:        Dias;
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
    facultad: Dias;
}
