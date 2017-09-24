import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component( {
    selector: 'page-compra',
    templateUrl: 'compra.html'
})

export class CompraPage implements OnInit{

    public produtos;

    constructor(public navCtrl:NavController, private lista:Http,
        private load:LoadingController, private alert:AlertController){}

    ngOnInit() {
    
        let carreg = this.load.create({
            content: "Carregando produtos."
        });

        carreg.present();

        this.lista.get('http://aluracar.herokuapp.com/').map(res => res.json())
        .toPromise().then(retorno => {
            carreg.dismiss();
            this.produtos = retorno;
        }).catch(err => {
            carreg.dismiss();
            this.alert.create({
                title: "Erro na conexão!",
                subTitle: "Não possível obter a lista de presentes. Por favor, tente novamente mais tarde.",
                buttons: [{
                    text: "OK"
                }]
            }).present();
        });
    
    }
}