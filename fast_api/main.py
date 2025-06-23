from fastapi import FastAPI
from routes import toDos
from database import Base, engine

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.include_router(toDos.router)