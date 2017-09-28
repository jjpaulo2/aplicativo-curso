import { HomePage } from './../home/home';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    templateUrl:"./compra.html"
})

export class CompraPage {
    
    constructor(public navCtrl:NavController, private alerta:AlertController,
        private req:Http, private load:LoadingController){

            let loading = this.load.create({
                content:"Carregando os produtos."
            })

            loading.present();

        this.req.get("http://localhost:3000/produtos").map(res => res.json())
        .toPromise().then(retorno => {
            loading.dismiss();
            this.produtos = retorno;
        }).catch(err => {
            loading.dismiss();
            this.alerta.create({
                title:"Erro na conexão!",
                subTitle: "Por favor, tente novamente mais tarde.",
                buttons: [
                    {
                    text:"OK",
                    handler: () => {
                        this.navCtrl.setRoot(HomePage);
                    }
                }
                ]
            }).present();
        });
    }
    total = 0;

    produtos = [];

    compra(produto) {
        this.total += produto.preco;
        produto.quant++;
    }

    zerar(produto) {
        this.total -= (produto.quant*produto.preco);
        this.total = Math.abs(this.total);
        produto.quant = 0;
    }

    confirmarCompra() {
        if(this.total > 0) {
            this.alerta.create({
                title:"Tem certeza?",
                subTitle:"Você está prestes a realizar uma compra no valor de "+this.precoFormatado(this.total)+". Deseja prossegui?",
                buttons:[
                    {
                        text:"Continuar",
                        handler: () => {
                            this.alerta.create({
                                subTitle:"Compra efetuada com sucesso!",
                                buttons: [
                                    {
                                        text:"OK",
                                        handler: () => {
                                            this.navCtrl.setRoot(HomePage);
                                        }
                                    }
                                ]
                            }).present();
                        } 
                    },
                    {
                        text: "Cancelar",
                        handler: () => {
                            this.alerta.create({
                                subTitle:"Compra cancelada com sucesso!",
                                buttons: [
                                    {text:"OK"}
                                ]
                            }).present();
                        }
                    }
                ]

            }).present();
        }
        else {
            this.alerta.create({
                subTitle:"Não foi possível efetuar compra porque não há produto selecionado.",
                buttons: [
                    {text:"OK"}
                ]
            })
        }
    }

    precoFormatado(preco) {
        return "R$ "+preco.toFixed(2);
    }
}