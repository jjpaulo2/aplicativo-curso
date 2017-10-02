import { CompraPage } from './../compra/compra';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl:"./configuracao.html"
})

export class ConfiguracaoPage {

    serverLink = {
        ip: "",
        port: "",
        dir: ""
    }

    salvarLink(){
        this.alerta.create({
            title:"Tem certeza?",
            subTitle:'Deseja fazer requisição para "http://'+this.serverLink.ip+":"
            +this.serverLink.port+"/"+this.serverLink.dir+" ?",
            buttons: [
                {
                    text:"OK",
                    handler: () => {
                        console.log(this.serverLink);
                        //this.navCtrl.setRoot(CompraPage);
                    }
                },
                {
                    text:"Cancelar"
                }
            ]
        }).present();
    }

    constructor(public navCtrl:NavController, private alerta:AlertController){
    }



}