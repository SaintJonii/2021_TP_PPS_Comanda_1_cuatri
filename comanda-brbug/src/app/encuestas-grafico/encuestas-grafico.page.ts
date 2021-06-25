import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { EncuestaService } from '../services/encuesta.service';

@Component({
  selector: 'app-encuestas-grafico',
  templateUrl: './encuestas-grafico.page.html',
  styleUrls: ['./encuestas-grafico.page.scss'],
})
export class EncuestasGraficoPage implements OnInit {

  @ViewChild('barCanvas') public barCanvas: ElementRef;
  @ViewChild('pieCanvas') public pieCanvas: ElementRef;
  @ViewChild('doughnutCanvas') public doughnutCanvas: ElementRef;
  @ViewChild('polarAreaCanvas') public polarAreaCanvas: ElementRef;
  barChart: any;
  pieChart: any;
  doughnutChart: any;
  polarAreaChart: any;

  encuestas : any [] = [];
  objetoJSON : string = null;

  promedioVelocidad : string = null;
  promedioAtencion : string = null;
  promedioComida : string = null;
  promedioLimpieza : string = null;

  constructor(private encuestaSv : EncuestaService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.encuestaSv.actualizarEncuestas();
    Chart.register(...registerables);
    this.barChartMethod();
    this.pieChartMethod();
    this.doughnutChartMethod();
    this.polarAreaChartMethod();
  }

  //Grafico bar para velocidad
  barChartMethod(){

    //estrella 5,4,3,2,1
    let velocidadArray : number [] = [0,0,0,0,0];
    let cantidad : number = 0;
    let acumulador : number = 0;

    this.objetoJSON=localStorage.getItem("encuestas");
    this.encuestas=JSON.parse(this.objetoJSON);

    for(let encuesta of this.encuestas) {
      if(encuesta.velocidad==1)
      {
        velocidadArray[4]++;
      }
      else if(encuesta.velocidad==2)
      {
        velocidadArray[3]++;
      }
      else if(encuesta.velocidad==3)
      {
        velocidadArray[2]++;
      }
      else if(encuesta.velocidad==4)
      {
        velocidadArray[1]++;
      }
      else if(encuesta.velocidad==5)
      {
        velocidadArray[0]++;
      }
      cantidad++;
      acumulador+=encuesta.velocidad;
    }
    this.promedioVelocidad = (acumulador / cantidad).toFixed(1);

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
          labels: ['5 Estrella', '4 Estrella', '3 Estrella', '2 Estrella', '1 Estrella'],
          datasets: [{
              data: velocidadArray,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          plugins:{
            legend: {
              display: false
            }
          },
          elements: {
            bar: {
              borderRadius: 20,
            }
          },
          indexAxis: 'y',
          scales: {
              y: {
                  grid: {
                    display: false
                  },
                  beginAtZero: true
              },
              x: {
                  ticks: {
                    display: true
                  },
                  grid: {
                    display: false
                  },
              }
          }
      }
    });
  }

  //Grafico pie para atencion
  pieChartMethod(){
    let atencionArray : number [] = [0,0,0,0,0];
    let cantidad : number = 0;
    let acumulador : number = 0;

    this.objetoJSON=localStorage.getItem("encuestas");
    this.encuestas=JSON.parse(this.objetoJSON);

    for(let encuesta of this.encuestas) {
      if(encuesta.atencion==1)
      {
        atencionArray[4]++;
      }
      else if(encuesta.atencion==2)
      {
        atencionArray[3]++;
      }
      else if(encuesta.atencion==3)
      {
        atencionArray[2]++;
      }
      else if(encuesta.atencion==4)
      {
        atencionArray[1]++;
      }
      else if(encuesta.atencion==5)
      {
        atencionArray[0]++;
      }
      cantidad++;
      acumulador+=encuesta.atencion;
    }
    this.promedioAtencion = (acumulador / cantidad).toFixed(1);

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
          labels: ['5 Estrella', '4 Estrella', '3 Estrella', '2 Estrella', '1 Estrella'],
          datasets: [{
              data: atencionArray,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderWidth: 1
          }]
      },
    });
  }

  //Grafico doughnut para comida
  doughnutChartMethod(){
    let comidaArray : number [] = [0,0,0,0,0];
    let cantidad : number = 0;
    let acumulador : number = 0;

    this.objetoJSON=localStorage.getItem("encuestas");
    this.encuestas=JSON.parse(this.objetoJSON);

    for(let encuesta of this.encuestas) {
      if(encuesta.comida==1)
      {
        comidaArray[4]++;
      }
      else if(encuesta.comida==2)
      {
        comidaArray[3]++;
      }
      else if(encuesta.comida==3)
      {
        comidaArray[2]++;
      }
      else if(encuesta.comida==4)
      {
        comidaArray[1]++;
      }
      else if(encuesta.comida==5)
      {
        comidaArray[0]++;
      }
      cantidad++;
      acumulador+=encuesta.comida;
    }

    this.promedioComida = (acumulador / cantidad).toFixed(1);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ['5 Estrella', '4 Estrella', '3 Estrella', '2 Estrella', '1 Estrella'],
          datasets: [{
              data: comidaArray,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderWidth: 1
          }]
      },
    });
  }

  //Grafico polar area para limpieza
  polarAreaChartMethod(){
    let limpiezaArray : number [] = [0,0,0,0,0];
    let cantidad : number = 0;
    let acumulador : number = 0;

    this.objetoJSON=localStorage.getItem("encuestas");
    this.encuestas=JSON.parse(this.objetoJSON);

    for(let encuesta of this.encuestas) {
      if(encuesta.limpieza==1)
      {
        limpiezaArray[4]++;
      }
      else if(encuesta.limpieza==2)
      {
        limpiezaArray[3]++;
      }
      else if(encuesta.limpieza==3)
      {
        limpiezaArray[2]++;
      }
      else if(encuesta.limpieza==4)
      {
        limpiezaArray[1]++;
      }
      else if(encuesta.limpieza==5)
      {
        limpiezaArray[0]++;
      }
      cantidad++;
      acumulador+=encuesta.limpieza;
    }

    this.promedioLimpieza = (acumulador / cantidad).toFixed(1);

    this.polarAreaChart = new Chart(this.polarAreaCanvas.nativeElement, {
      type: 'polarArea',
      data: {
          labels: ['5 Estrella', '4 Estrella', '3 Estrella', '2 Estrella', '1 Estrella'],
          datasets: [{
              data: limpiezaArray,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderWidth: 1
          }]
      },
    });
  }

}
