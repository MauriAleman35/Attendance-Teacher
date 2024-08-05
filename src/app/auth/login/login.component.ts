import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterLink,FormsModule
  ],
  templateUrl: './login.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  codigo: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.codigo, this.password).subscribe({
      next: response => {
        console.log('Login exitoso', response);
        this.router.navigate(['/admin/Administradores']); // Redirige a la página principal
      },
      error: error => {
        console.error('Error en el login', error);
        alert('Código o contraseña incorrectos');
      }
    });
  }
}
