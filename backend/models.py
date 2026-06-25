from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from database import Base

class Telemetria(Base):
    __tablename__ = "telemetria"

    id = Column(Integer, primary_key=True, index=True)

    nodo_id = Column(Integer)

    temperatura = Column(Float)
    humedad = Column(Float)
    bateria = Column(Float)

    valvula = Column(String(20))

    fecha = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )