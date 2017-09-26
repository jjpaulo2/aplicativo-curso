import { HomePage } from './../home/home';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component( {
    selector: 'page-compra',
    templateUrl: 'compra.html'
})

export class CompraPage implements OnInit{

    public produtos;
    public total = 0;

    constructor(public navCtrl:NavController, private lista:Http,
        private load:LoadingController, private alert:AlertController){}

    ngOnInit() {
    
        let carreg = this.load.create({
            content: "Carregando produtos."
        });

        carreg.present();

        this.lista.get('http://localhost:3000/produtos').map(res => res.json())
        .toPromise().then(retorno => {
            carreg.dismiss();
            this.produtos = retorno;
        }).catch(err => {
            carreg.dismiss();
            this.alert.create({
                title: "Erro na conexão!",
                subTitle: "Não possível obter a lista de presentes. Por favor, tente novamente mais tarde.",
                buttons: [{
                    text: "OK",

                }]
            }).present();
            this.navCtrl.setRoot(HomePage);
        });
    
    }

    comprar(produto) {
        produto.quant++;
        this.total += produto.preco;
    }

    zerar(produto) {
        this.total -= produto.quant*(produto.preco);
        this.total = Math.abs(this.total);
        produto.quant = 0;
    }

    finalizar() {
        this.alert.create({
            title:"Tem certeza?",
            subTitle:"Você está prestes a finalizar uma compra de R$"+this.total.toFixed(2)+". Deseja prosseguir?",
            buttons: [
                {
                    text:"Confirmar",
                    handler: () => {
                        this.alert.create({
                            subTitle:"Compra efetuada com sucesso!",
                            buttons: [{text:"OK"}]
                        }).present();
                        this.total = 0;
                        this.navCtrl.popToRoot();
                    }
                },
                {
                    text:"Cancelar",
                    handler: () => {
                        this.alert.create({
                            subTitle:"Compra cancelada com sucesso!",
                            buttons: [{text:"OK"}]
                        }).present();
                    }
                }
            ]
        }).present();
    }

}