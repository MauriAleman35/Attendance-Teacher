export interface Aulas {
    id:        number;
    numero:    string;
    capacidad: number;
    modulo:    Modulo;
}

export interface Modulo {
    id:        number;
    numero:    string;
    direccion: string;
    facultad:  Facultad;
}

export interface Facultad {
    id:     number;
    nombre: string;
}
