import { HomePage } from './../home/home';
import { NavController, AlertController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: "contato-page",
    templateUrl: "./contato.html"
})


export class ContatoPage {
    
    usuario = {
        nome:"",
        email:"",
        mensagem:""
    }

    constructor(public navCtrl:NavController, private alert:AlertController){}

    enviar() {
        if(this.formularioPreenchido()){
            this.alert.create({
                subTitle:"Mensagem enviada com sucesso!",
                buttons: [{
                    text: "OK"
                }]
            }).present();
            this.navCtrl.setRoot(HomePage);
        }
        else {
            let incompleto;
            if(this.campoEmBranco() == 1) {
                incompleto = "nome";
            }
            else if(this.campoEmBranco() == 2) {
                incompleto = "email";
            }
            else {
                incompleto = "mensagem";
            }
            this.alert.create({
                title: "Formulário incompleto!",
                subTitle:"Por favor, preencha o campo de "+incompleto+".",
                buttons: [{
                    text: "OK"
                }]
            }).present();
        }
        
    }

    formularioPreenchido(){
        return (this.usuario.nome!="") && (this.usuario.email!="") && (this.usuario.mensagem!="");
    }
    campoEmBranco(){
        if(this.usuario.nome == "") return 1;
        else if(this.usuario.email == "") return 2;
        else return 3;
    }

}