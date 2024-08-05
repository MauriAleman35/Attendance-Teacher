export interface Solicitud {
    id:             number;
    fechaInicio:    Date;
    fechaFin:       Date;
    motivo:         string;
    estado:         boolean;
    fechaSolicitud: Date;
    docente:        Docente;
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
