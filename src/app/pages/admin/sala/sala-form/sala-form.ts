import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { SalaService } from '../../../../core/services/sala.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from '../../../../core/models';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent implements OnInit {

  private fb = inject(FormBuilder);

  private salaService = inject(SalaService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.salaService.buscarPorId(Number(id)).subscribe({

        next: (sala) => {
          this.formSala.patchValue(sala);
        },
        error:(erro) => {
          console.error('Erro ao buscar sala:', erro);
        }
      });
    }
  }
  save(): void{
    const valor = this.formSala.getRawValue();

    const sala: Sala = {

      id: Number(valor.id ?? 0),

      nome: valor.nome ?? '',

      preco: Number(valor.preco ?? 0)
    };

    this.salaService.salvar(sala).subscribe({
      next: () => {

        this.router.navigate([`/salas`])
      },
      error: (erro) => {
        console.error('Erro ao salvar sala:', erro);
      }
    });
    
  }

}
