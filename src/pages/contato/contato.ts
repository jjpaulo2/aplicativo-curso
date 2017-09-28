import { HomePage } from './../home/home';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl:"./contato.html"
})

export class ContatoPage {

    formulario = {
        nome: "",
        email: "",
        mensagem: ""
    };

    constructor(public navCtrl:NavController, private alerta:AlertController){}

    enviar(){
        if(this.formularioOk()){
        console.log(this.formulario.nome);
        console.log(this.formulario.email);
        console.log(this.formulario.mensagem);
        this.alerta.create({
            subTitle: "Formulário enviado com sucesso!",
            buttons: [
                {text:"ok"}
            ]
        }).present();
        this.navCtrl.setRoot(HomePage);

        }
        else {
            this.alerta.create({
                title:"Erro no formulário!",
                subTitle: "Preencha o campo "+this.campoVazio()+" corretamente.",
                buttons: [{
                    text:"OK"
                }]
            }).present();
        }
    }

    campoVazio(){
        if(this.formulario.nome == "") return "nome";
        else if(this.formulario.email == "") return "email";
        else return "mensagem";
    }

    formularioOk(){
        return (this.formulario.nome!="")&&(this.formulario.email!="")&&(this.formulario.mensagem!="")
    }

}