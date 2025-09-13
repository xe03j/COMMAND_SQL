# CommandSQL Front

Bienvenido al repositorio del proyecto CommandSQL Front, una aplicación educativa y gamificada para aprender comandos SQL mediante misiones, logros y un sistema de progreso.

Este frontend está desarrollado en Vue.js y se conecta a la API de CommandSQL para gestionar la autenticación, el avance de misiones, los logros obtenidos y más.

## WEB

- Esta web ya tiene una url web alojada en:

```bash
https://command-sql-front.onrender.com/
```

## Estructura del Proyecto

- El repositorio contiene la interfaz principal del jugador, que incluye:

- Login y Registro: Autenticación de usuarios con JWT.

- Dashboard: Vista general con acceso a misiones y logros.

- Misiones: Ejercicios prácticos de SQL con pistas y retroalimentación en tiempo real.

- Logros: Sistema de recompensas que motiva el aprendizaje.

- Manual: Guía de comandos y referencias rápidas para el jugador.

## Tecnologías Utilizadas

- Vue.js 3 con Composition API

- Vue Router para el manejo de rutas protegidas

- Axios para la comunicación con la API de CommandSQL

- PrimeVue para componentes de interfaz

- LocalStorage para persistencia de sesión
## Instalación

Instrucciones paso a paso para configurar el proyecto en tu entorno local.


### clona el repositorio
```bash
git clone https://github.com/xe03j/COMMAND_SQL_FRONT.git
```

### instala las dependencias
```bash
npm install
```
### inicia el servidor de desarrollo
```bash
npm run serve
```

### Si quiere usar la version con el api ya en la web usa la version de la rama despliegue
- Le pedimos que en la version web sea paciente ya que al usar un servicio de host gratuito pueden haber esperas de hasta 1 minuto

### Si quiere usar la version con el api local use la version de la rama master pero ojo aqui debe cambiar la url por 
```bash
http://localhost:8000/(endpoints)
```
### si usa master debe de instalar el API REST del repositorio:

```bash
https://github.com/xe03j/COMMAND_SQL_BACK
```
### Adicional siga los pasos de configuracion ahi descritos para correr el api FastAPI

## Browser Support

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">


