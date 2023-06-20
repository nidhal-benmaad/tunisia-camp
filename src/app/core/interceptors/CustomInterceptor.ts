import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';


@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Ajouter les en-têtes CORS personnalisés
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'http://localhost:8082') // Remplacez l'URL avec celle de votre serveur
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      .set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Cloner la requête avec les en-têtes personnalisés
    const modifiedReq = req.clone({ headers });

    // Passer la requête modifiée au gestionnaire suivant
    return next.handle(modifiedReq);
  }
}
