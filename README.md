<div align="center">
  <img src="https://img.shields.io/badge/Proyecto_Institucional-Icesi-004481?style=for-the-badge&logo=institution">
  <img src="https://img.shields.io/badge/Departamento-CTS-ffb600?style=for-the-badge">
  <br>
  <h1>🤖 AI RAG Chatbot Universitario</h1>
  <p><strong>Propuesta tecnológica para la automatización de la asesoría académica sobre asignaturas electivas del Departamento de Ciencia, Tecnología y Sociedad (CTS).</strong></p>
</div>

---

## 📖 Sobre el Proyecto

Este repositorio contiene la arquitectura completa de un sistema conversacional inteligente (**Chatbot RAG**), diseñado para asistir a los estudiantes de la Universidad Icesi. Su objetivo principal es resolver dudas y recomendar asignaturas electivas del portafolio CTS de una manera interactiva, semántica y altamente escalable. 

Destaca por estar construido íntegramente con arquitecturas MLOps/LLMOps modernas, utilizando **Supabase (PostgreSQL + pgvector)** como motor de bases de datos para habilitar una técnica avanzada de búsqueda conocida como **Hybrid Search**.

<br>

<div align="center">
  <img src="https://img.shields.io/badge/n8n-Workflow_Automation-EA4B71?style=flat-square&logo=n8n">
  <img src="https://img.shields.io/badge/Supabase-Hybrid_Search-3ECF8E?style=flat-square&logo=supabase">
  <img src="https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?style=flat-square&logo=postgresql">
  <img src="https://img.shields.io/badge/Vanilla_JS-Frontend-F7DF1E?style=flat-square&logo=javascript">
</div>

<br>

## 🚀 Arquitectura y Componentes

El proyecto está dividido en tres capas principales:

### 1. 🧠 Motor de Inferencias & Orquestación (n8n)
Construido con automatizaciones en **n8n**, se encarga de manejar todo el flujo de Retrieval-Augmented Generation.
- **Ingesta Dinámica:** Extrae la información académica desde documentos de texto, PDF o scripts en SQL, dividiendo los programas en chunks y creando embeddings (*Representación Vectorial*).
- **Memoria de Sesión:** Mantiene activo el contexto del chat mediante IDs dinámicos para conversar con el estudiante de manera continua.

### 2. 🗄️ Base de Datos & Hybrid Search (Supabase / PostgreSQL)
Implementada sobre **Supabase** (PostgreSQL 16) utilizando la extensión **pgvector**.
- Posee más de **320 chunks de datos** de electivas vectorizados por áreas de conocimiento, horarios, y programas académicos.
- **Implementación de [Hybrid Search](https://supabase.com/docs/guides/ai/hybrid-search):** La arquitectura no se limita a un simple Cosine Similarity vectorial; fusiona **Búsqueda Semántica** (Embeddings algorítmicos) y **Full-Text Search** (Búsqueda por palabras clave indexadas en SQL). Esto garantiza que el LLM reciba coincidencias contextuales ultra-precisas desde el vector store, maximizando la relevancia de la respuesta hacia el usuario final.

### 3. 💻 Interfaz Web Interactiva (Frontend)
Una Single Page Application (SPA) responsiva y amigable.
- Construida en **Vanilla JS/HTML/CSS** para ser ultra-rápida y fácil de embeber en web institucionales o LMS como Moodle.
- Funciona vía comunicación Webhook asíncrona directamente con el cerebro en n8n y alineada al branding de Icesi.

---

## 📂 Organización del Repositorio

```text
📦 AI-RAG-Chatbot-Icesi
 ┣ 📂 Backend/                # Flujos exportados (JSON) de n8n (Ingestas y Chatbot Agent)
 ┣ 📂 Database Deployment/    # Configuración original, documentación SQL e infraestructura
 ┣ 📂 Frontend/               # UI del estudiante. (HTML, CSS, JS custom y logos)
 ┃ ┗ 📂 assets/
 ┃   ┗ 📂 images/             # Recursos visuales e imágenes corporativas (Logos Icesi)
 ┣ 📂 docs/                   # Guías de despliegue, manuales de cambios e implementación
 ┣ 📂 Data_2026/              # Datasets raw base, PDFs de sílabos y horarios CSV
 ┣ 📜 README.md               # Este archivo
 ┗ 📜 .gitignore              # Configuración local de git
```

---

## ⚙️ Despliegue e Instalación Recomendada

Toda la solución está pensada para desplegarse mediante contenedores y servicios serverless como Supabase. 

1. **Datos (Supabase):** Crear un proyecto en Supabase, activar la extensión de `pgvector` y crear las funciones RPC necesarias (Match Documents) para habilitar el *Hybrid Search* en el esquema SQL.
2. **Orquestador (n8n):** Levantar una instancia local/dockerizada de n8n o conectarse a n8n Cloud.
3. **Importar Flujos:** Cargar los `.json` directamente sobre los canvas de n8n (`Backend/`) y configurar las credenciales de la API de Supabase / Base de datos.
4. **Alimentación Datos:** Ejecutar *manualmente una sola vez* los flujos de inserción de electivas para poblar el RAG.
5. **Frontend:** Publicar de forma estática en cualquier CDN (Vercel, Netlify) actualizando la URL base del Webhook principal en `Frontend/config.js`.

---

<div align="center">
  <p>👨‍💻 <strong>A AI Automation Engineer & Full-Stack Developer Project</strong> — <em>Desarrollo en proceso de innovación tecnológica universitaria | 2026</em></p>
</div>