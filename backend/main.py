from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, Telemetria

app = FastAPI(
    title="Sistema de Riego IoT",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

estado_actual = {
    "nodo_id": 0,
    "temperatura": 0,
    "humedad": 0,
    "bateria": 0,
    "valvula": "desconocida"
}


@app.get("/")
def root():
    return {
        "mensaje": "Sistema de Riego IoT funcionando"
    }


@app.get("/estado")
def obtener_estado():
    return estado_actual


@app.post("/telemetria")
def recibir(datos: dict):

    global estado_actual

    estado_actual = {
        "nodo_id": datos["nodo_id"],
        "temperatura": datos["temperatura"],
        "humedad": datos["humedad"],
        "bateria": datos["bateria"],
        "valvula": datos["valvula"]
    }

    db = SessionLocal()

    try:
        registro = Telemetria(
            nodo_id=datos["nodo_id"],
            temperatura=datos["temperatura"],
            humedad=datos["humedad"],
            bateria=datos["bateria"],
            valvula=datos["valvula"]
        )

        db.add(registro)
        db.commit()

        return {
            "mensaje": "Datos guardados correctamente"
        }

    finally:
        db.close()

@app.delete("/historial")
def borrar_historial():

    db = SessionLocal()

    try:
        db.query(Telemetria).delete()
        db.commit()

        return {
            "mensaje": "Historial eliminado"
        }

    finally:
        db.close()
@app.get("/historial")
def obtener_historial():

    db = SessionLocal()

    try:
        registros = (
            db.query(Telemetria)
            .order_by(Telemetria.fecha.asc())
            .all()
        )

        return [
            {
                "id": r.id,
                "nodo_id": r.nodo_id,
                "temperatura": r.temperatura,
                "humedad": r.humedad,
                "bateria": r.bateria,
                "valvula": r.valvula,
                "fecha": r.fecha
            }
            for r in registros
        ]

    finally:
        db.close()