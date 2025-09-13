<script setup>
import image from '@/assets/manualbg.png';
// 👇 importa la fuente que descargaste con npm
import '@fontsource/press-start-2p';
import bS from '@/assets/bS.mp3';
import { onBeforeUnmount, onMounted } from 'vue'; // audio

let audio = null;

onMounted(() => {
    audio = new Audio(bS);
    audio.loop = true;
    audio.volume = 0.4; //
    audio.play().catch((err) => {
        console.warn('El navegador bloqueó autoplay, se necesita interacción:', err);
    });
});

onBeforeUnmount(() => {
    if (audio) {
        audio.pause();
        audio = null;
    }
});
</script>

<template>
    <div class="manual-container">
        <!-- Fondo -->
        <div class="background">
            <img :src="image" alt="Fondo" />
            <div class="overlay"></div>
        </div>

        <!-- Contenido -->
        <h1 class="titulo md:text-7xl">Manual de la Nave</h1>
        <p class="intro">Bienvenido cadete, aquí aprenderás los <span class="resaltar">comandos SQL</span> básicos para operar la nave.</p>

        <div class="manual-grid">
            <!-- SELECT -->
            <div class="card">
                <h2 class="card-title">Comando SELECT</h2>
                <p class="card-text">Utiliza <code>SELECT</code> para consultar datos de los sistemas.</p>
                <div class="code-box">
                    <pre><code>SELECT estado FROM escudos;</code></pre>
                </div>
            </div>

            <!-- WHERE -->
            <div class="card">
                <h2 class="card-title">Cláusula WHERE</h2>
                <p class="card-text">Filtra resultados con <code>WHERE</code>.</p>
                <div class="code-box">
                    <pre><code>SELECT energia FROM armas
WHERE tipo = 'phaser';</code></pre>
                </div>
            </div>

            <!-- Operadores -->
            <div class="card">
                <h2 class="card-title">Operadores Lógicos</h2>
                <p class="card-text">Combina condiciones con <code>AND</code>, <code>OR</code> y <code>NOT</code>.</p>
                <div class="code-box">
                    <pre><code>SELECT * FROM sensores
WHERE tipo='calor' A
AND activo=TRUE;</code></pre>
                </div>
            </div>

            <!-- DELETE -->
            <div class="card">
                <h2 class="card-title">Comando DELETE</h2>
                <p class="card-text">Elimina registros específicos.</p>
                <div class="code-box">
                    <pre><code>DELETE FROM objetivos
WHERE estado = 'destruido';</code></pre>
                </div>
            </div>

            <!-- INSERT -->
            <div class="card">
                <h2 class="card-title">Comando INSERT</h2>
                <p class="card-text">Agrega nuevos registros a una tabla.</p>
                <div class="code-box">
                    <pre><code>INSERT INTO sensores
      (objeto, distancia)
VALUES ('asteroide', 5000);</code></pre>
                </div>
            </div>

            <!-- UPDATE -->
            <div class="card">
                <h2 class="card-title">Comando UPDATE</h2>
                <p class="card-text">Modifica registros existentes.</p>
                <div class="code-box">
                    <pre><code>UPDATE armas SET energia = 100
WHERE tipo = 'phaser';</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Comando CREATE TABLE</h2>
                <p class="card-text">Se usa para crear nuevas tablas en la base de datos.</p>
                <div class="code-box">
                    <pre><code>CREATE TABLE tripulacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    rango VARCHAR(20)
);</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Comando ALTER TABLE</h2>
                <p class="card-text">Permite modificar la estructura de una tabla existente.</p>
                <div class="code-box">
                    <pre><code>ALTER TABLE tripulacion
ADD COLUMN edad INT;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Comando DROP TABLE</h2>
                <p class="card-text">Elimina una tabla y todos sus datos.</p>
                <div class="code-box">
                    <pre><code>DROP TABLE tripulacion;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Cláusula ORDER BY</h2>
                <p class="card-text">Sirve para ordenar los resultados de una consulta.</p>
                <div class="code-box">
                    <pre><code>SELECT nombre, rango
FROM tripulacion
ORDER BY rango ASC;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Cláusula GROUP BY</h2>
                <p class="card-text">Agrupa registros que tienen valores en común.</p>
                <div class="code-box">
                    <pre><code>SELECT rango, COUNT(*)
FROM tripulacion
GROUP BY rango;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Cláusula HAVING</h2>
                <p class="card-text">Filtra resultados después de un <code>GROUP BY</code>.</p>
                <div class="code-box">
                    <pre><code>SELECT rango, COUNT(*)
FROM tripulacion
GROUP BY rango
HAVING COUNT(*) &gt; 2;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Comando CREATE DATABASE</h2>
                <p class="card-text">Crea una nueva base de datos.</p>
                <div class="code-box">
                    <pre><code>CREATE DATABASE tu_base;</code></pre>
                </div>
            </div>

            <div class="card">
                <h2 class="card-title">Comando DROP DATABASE</h2>
                <p class="card-text">Elimina por completo una base de datos.</p>
                <div class="code-box">
                    <pre><code>DROP DATABASE tu_base;</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.manual-container {
    position: relative;
    min-height: 100vh;
    padding: 3rem 2rem;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
    color: #fff;
    z-index: 10;
    overflow: hidden;
}

.background {
    position: fixed;
    inset: 0;
    z-index: -2;
}

.background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: -1;
}

/* Planeta */
.planet {
    position: fixed;
    left: -550px;
    top: 50%;
    transform: translateY(-50%);
    width: 10000px;
    opacity: 0.95;
    z-index: -1;
}

.titulo {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: #15ff73;
    text-shadow: 0 0 12px #15ff73, 0 0 25px #00ff66;
}

.intro {
    font-size: 1rem;
    margin-bottom: 3rem;
    max-width: 900px;
    margin-inline: auto;
    line-height: 1.8;
    color: #ffffff; /* 👈 blanco */
}

.resaltar {
    color: #15ff73;
    text-shadow: 0 0 8px #15ff73;
}

.manual-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 2rem;
}

/* Tarjetas */
.card {
    background: linear-gradient(145deg, #0f172a, #1e293b);
    border: 2px solid #15ff73;
    border-radius: 18px;
    padding: 2rem;
    text-align: left;
    box-shadow: 0 0 25px rgba(21, 255, 115, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 0 35px rgba(21, 255, 115, 0.7);
}

.card-title {
    font-size: 1.2rem;
    color: #15ff73;
    margin-bottom: 1rem;
    text-shadow: 0 0 6px #15ff73;
}

.card-text {
    font-size: 0.9rem;
    color: #f1f5f9;
    margin-bottom: 1rem;
    line-height: 1.6;
}

/* Caja de código */
.code-box {
    background: #000000;
    border: 1px solid #15ff73;
    border-radius: 10px;
    padding: 1rem;
    font-size: 0.75rem;
    overflow-x: auto;
    box-shadow: inset 0 0 12px rgba(21, 255, 115, 0.3);
}

.code-box code {
    color: #15ff73;
    font-family: 'Press Start 2P', monospace;
}
</style>
